const db = require('../connection');

const getMessagesAndSales = (ID,userType) => {
  return db.query(
    `SELECT messages.id as message, sale_id, body, sales.listing_id, sales.user_id, sales.admin_id, admin_is_sender
     FROM messages
     JOIN sales ON sale_id = sales.id
     WHERE sale_id IN (SELECT id FROM sales WHERE admin_id = 1);`
    , [ID, userType])
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const createMessage = (sale_id,userType,messageBody) => {
  return db.query(
    `INSERT INTO messages (sale_id, admin_is_sender, body)
    VALUES ($1, $2, $3')
    RETURNING *;
    `, [sale_id, userType, messageBody])
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { getMessagesAndSales, createMessage };
