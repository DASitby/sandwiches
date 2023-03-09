const db = require('../connection');

const deleteListing = (listingID) => {
  return db.query(
    `DELETE
     FROM listings
      WHERE id = $1;`, [listingID])
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { deleteListing };
