const db = require('../connection');


const getListings = (options = {}) => {
  const queryParams = [];
  let queryString = `SELECT listings.id, title, admins.name as seller, thumbnail_url
  FROM listings
  JOIN admins on admins.id = admin_id
  ORDER BY RANDOM()`;

  const checkWhere = (string) => {
    if (string.includes('WHERE')) {
      queryString += 'WHERE';
    } else {
      queryString += 'and';
    }
  };

  if (options.size) {
    queryParams.push(`${options.size}`);
    checkWhere(queryString);
    queryString += `size = $${queryParams.length}`;
  }

  if (options.gluten_free) {
    queryParams.push(`${options.gluten_free}`);
    checkWhere(queryString);
    queryString += `gluten_free = $${queryParams.length}`;
  }

  if (options.vegetarian) {
    queryParams.push(`${options.vegetarian}`);
    checkWhere(queryString);
    queryString += `vegetarian = $${queryParams.length}`;
  }

  queryString += `LIMIT 9`;
  return db.query(queryString, queryParams)
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { getListings };
