const express = require('express');
const router  = express.Router();
const { getMessagesAdmin, getMessagesUser } = require('../db/queries/08_messages');

router.get('/', (req, res) => {
  let id;
  let cookieArray = req.headers.cookie.split(" ");
  cookieArray.forEach(cookie => {
    const [key, value] = cookie.split('=');
    if (key === 'user_id') {
      const numValue = Number(value.substring(0,1)); // Convert the value to a number
      if (!isNaN(numValue)) { // Check if the value is a number
        console.log(`${key} has a number value: ${numValue}`);
        id = numValue;
        getMessagesUser(id)
          .then((messages) => {
            res.send(messages);
          });
      }
    }
    if (key === 'admin_id') {
      const numValue = Number(value.substring(0,1)); // Convert the value to a number
      if (!isNaN(numValue)) { // Check if the value is a number
        console.log(`${key} has a number value: ${numValue}`);
        id = numValue;
        getMessagesAdmin(id)
          .then((messages) => {
            res.send(messages);
          });
      }
    }
  });
});

module.exports = router;
