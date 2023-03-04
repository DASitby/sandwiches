const db = require('../connection');

const createListing = (listing) => {
  return db.query(
    `INSERT INTO listings (
      admin_id,
      start_date,
      title,
      description,
      gluten_free,
      vegetarian,
      size,
      bread_type,
      protein,
      price,
      thumbnail_url)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);
     RETURNING *;`,
    [listing.admin_id,
      Date.now(),
      listing.title,
      listing.description,
      listing.gluten_free,
      listing.vegetarian,
      listing.size,
      listing.bread_type,
      listing.protein,
      listing.price,
      listing.thumbnail_url])
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { createListing };
