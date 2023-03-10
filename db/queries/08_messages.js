const db = require('../connection');

const getMessagesAdmin = (ID) => {
  return db.query(
    `SELECT messages.id as message, sale_id, body, sales.listing_id, sales.user_id, sales.admin_id, admin_is_sender, listings.title, listings.description, listings.size, listings.gluten_free, listings.vegetarian, listings.protein, listings.bread_type, listings.price, listings.thumbnail_url
     FROM messages
     JOIN sales ON sale_id = sales.id
     JOIN listings ON sales.listing_id = listings.id
     WHERE sale_id IN (SELECT id FROM sales WHERE admin_id = $1);`
    , [ID])
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};
const getMessagesUser = (ID) => {
  return db.query(
    `SELECT messages.id as message, sale_id, body, sales.listing_id, sales.user_id, sales.admin_id, admin_is_sender, listings.title, listings.description, listings.size, listings.gluten_free, listings.vegetarian, listings.protein, listings.bread_type, listings.price, listings.thumbnail_url
    FROM messages
    JOIN sales ON sale_id = sales.id
    JOIN listings ON sales.listing_id = listings.id
     WHERE sale_id IN (SELECT id FROM sales WHERE sale_id = $1);`
    , [ID])
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const createMessage = (sale_id,isAdmin,messageBody) => {
  return db.query(
    `INSERT INTO messages (sale_id, admin_is_sender, body)
    VALUES ($1, $2, $3)
    RETURNING *;
    `, [sale_id, isAdmin, messageBody])
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { getMessagesAdmin, getMessagesUser, createMessage };
