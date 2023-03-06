const db = require('../connection');


const getListings = (options = {}) => {
  const queryParams = [];
  let queryString = `SELECT listings.id, title, admins.name as seller, thumbnail_url
  FROM listings
  JOIN admins on admins.id = admin_id
  `;
  //My Listings button
  if (options.mine) {
    queryParams.push(1);
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
