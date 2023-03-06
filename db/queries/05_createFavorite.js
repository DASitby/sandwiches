const db = require('../connection');

const createFavorite = (userID,listing) => {
  return db.query(
    `INSERT INTO favorites (
      user_id, listing_id)
     VALUES ($1, $2)
     RETURNING *;`,
    [userID,
      listing.id])
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { createFavorite };
