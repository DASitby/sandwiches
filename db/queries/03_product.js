const db = require('../connection');

const getSandwich = (listingID) => {
  return db.query(
    `SELECT title, description, size, gluten_free, vegetarian, protein, bread_type, price, admins.name as seller_name, admins.email as seller_email, admins.phone_number as seller_phone_number, thumbnail_url
    FROM listings
    JOIN admins on admins.id = admin_id
    WHERE listings.id = $1;`, [listingID])
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { getSandwich };
