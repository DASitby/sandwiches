const db = require('../connection');

const getListings = () => {
  return db.query(
    `SELECT listings.id, title, admins.name as seller, thumbnail_url
    FROM listings
    JOIN admins on admins.id = admin_id
    ORDER BY RANDOM()
    LIMIT 9;`)
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { getListings };
