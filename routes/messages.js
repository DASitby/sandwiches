/*
 * All routes for Messages are defined here
 * Since this file is loaded in server.js into /create,
 *   these routes are mounted onto /listings
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const { getMessagesAdmin, getMessagesUser, createMessage } = require('../db/queries/08_messages');

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
            const templateVars = {messages, cookie: req.headers.cookie};
            res.render('messages', templateVars);
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
            const templateVars = {messages, cookie: req.headers.cookie};
            res.render('messages', templateVars);
          });
      }
    }
  });
});

router.post('/:id', (req, res) => {
  let isAdmin;
  let cookieArray = req.headers.cookie.split(" ");
  cookieArray.forEach(cookie => {
    const [key, value] = cookie.split('=');
    if (key === 'user_id') {
      const numValue = Number(value.substring(0,1)); // Convert the value to a number
      if (!isNaN(numValue)) { // Check if the value is a number
        isAdmin = false;
      }
    }
    if (key === 'admin_id') {
      const numValue = Number(value.substring(0,1)); // Convert the value to a number
      if (!isNaN(numValue)) { // Check if the value is a number
        isAdmin = true;
      }
    }
  });
  createMessage(req.params.id, isAdmin, req.body.text)
    .then(res.redirect('/messages/'));
});

module.exports = router;
