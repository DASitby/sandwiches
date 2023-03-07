const db = require('../connection');

const deleteFavorite = (userID,listingID) => {
  return db.query(
    `DELETE
     FROM favorites
      WHERE user_id = $1 and listing_id = $2;`, [userID, listingID])
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { deleteFavorite };
