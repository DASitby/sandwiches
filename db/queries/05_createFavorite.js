const db = require('../connection');

const createFavorite = (userID,listingID) => {
  return db.query(
    `INSERT INTO favorites (
      user_id, listing_id)
     VALUES ($1, $2)
     RETURNING *;`,
    [userID,
      listingID])
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { createFavorite };
