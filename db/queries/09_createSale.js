const db = require('../connection');

const createSale = (listing_id, user_id) => {
  return db.query(
    `INSERT INTO sales (listing_id, user_id)
    VALUES ($1, $2)
    RETURNING *;
    `, [listing_id, user_id])
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = {createSale};
