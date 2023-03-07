const db = require('../connection');

const checkFavorite = (userID,listingID) => {
  return db.query(
    `SELECT id
     FROM favorites
      WHERE user_id = $1 and listing_id = $2;`, [userID, listingID])
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { checkFavorite };
