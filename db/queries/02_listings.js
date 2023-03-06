const db = require('../connection');


const getListings = (options = {}) => {
  const queryParams = [];
  let queryString = `SELECT listings.id, title, admins.name as seller, thumbnail_url
  FROM listings
  JOIN admins on admins.id = admin_id
  `;
  //My Listings button
  if (options.admin_id) {
    queryParams.push(options.admin_id);
    queryString += `
    WHERE listings.admin_id = $${queryParams.length}
    ORDER BY RANDOM()
    LIMIT 9`;
    return db.query(queryString, queryParams)
      .then(data => {
        return data.rows;
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  //Favorites Button
  if (options.user_id) {
    queryParams.push(options.user_id);
    queryString += `
    JOIN favorites ON listing_id = listings.id
    WHERE  favorites.user_id = $${queryParams.length}
    ORDER BY RANDOM()
    LIMIT 9`;
    return db.query(queryString, queryParams)
      .then(data => {
        return data.rows;
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  const checkWhere = (string) => {
    if (string.length === 117) {
      queryString += 'WHERE';
    } else {
      queryString += 'and';
    }
  };

  if (options.size) {
    queryParams.push(`${options.size}`);
    checkWhere(queryString);
    queryString += ` size = $${queryParams.length} `;
  }

  if (options.gluten_free === true || options.gluten_free === false) {
    queryParams.push(`${options.gluten_free}`);
    checkWhere(queryString);
    queryString += ` gluten_free = $${queryParams.length} `;
  }

  if (options.vegetarian === true || options.vegetarian === false) {
    queryParams.push(`${options.vegetarian}`);
    checkWhere(queryString);
    queryString += ` vegetarian = $${queryParams.length} `;
  }

  if (options.bread_type) {
    queryParams.push(`${options.vegetarian}`);
    checkWhere(queryString);
    queryString += ` bread_type = $${queryParams.length} `;
  }

  if (options.protein) {
    queryParams.push(`${options.protein}`);
    checkWhere(queryString);
    queryString += ` protein = $${queryParams.length} `;
  }

  if (options.min_price && options.max_price) {
    queryParams.push(`${options.min_price}`);
    queryParams.push(`${options.max_price}`);
    checkWhere(queryString);
    queryString += ` price BETWEEN $${queryParams.length - 1} and $${queryParams.length}`;
  } else if (options.min_price) {
    queryParams.push(`${options.min_price}`);
    checkWhere(queryString);
    queryString += ` price > $${queryParams.length}`;
  } else if (options.max_price) {
    queryParams.push(`${options.max_price}`);
    checkWhere(queryString);
    queryString += ` price < $${queryParams.length}`;
  }
  queryString += `ORDER BY RANDOM()
  LIMIT 9`;
  return db.query(queryString, queryParams)
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { getListings };
