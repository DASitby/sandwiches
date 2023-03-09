const db = require('../connection');

const getSandwich = (listingID,userID) => {
  return db.query(
    `SELECT title, description, size, gluten_free, vegetarian, protein, bread_type, price, admins.id as admin_id, admins.name as seller_name, admins.email as seller_email, admins.phone_number as seller_phone_number, thumbnail_url, (SELECT CASE WHEN EXISTS
      (SELECT id
      FROM favorites
       WHERE favorites.user_id = $2 and favorites.listing_id = $1) THEN true ELSE false END) as favorite
    FROM listings
    JOIN admins on admins.id = admin_id
    LEFT JOIN favorites on listings.id = listing_id
    WHERE listings.id = $1;`, [listingID, userID])
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { getSandwich };
