/*
 * All routes for Listings are defined here
 * Since this file is loaded in server.js into /listings,
 *   these routes are mounted onto /listings
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const { getSandwich } = require('../db/queries/03_product');
const { deleteListing } = require('../db/queries/06_deleteListing.js');

router.get('/:id', (req, res) => {
  let sandwichID = req.params.id;
  let user_id;
  let cookieArray = req.headers.cookie.split(" ");
  let admin_id;

  cookieArray.forEach(cookie => {
    const [key, value] = cookie.split('=');
    if (key === 'user_id') {
      const numValue = Number(value.substring(0,1)); // Convert the value to a number
      if (!isNaN(numValue)) { // Check if the value is a number
        console.log(`${key} has a number value: ${numValue}`);
        user_id = numValue;
      }
    }
    if (key === 'admin_id') {
      const numValue = Number(value.substring(0,1)); // Convert the value to a number
      if (!isNaN(numValue)) { // Check if the value is a number
        console.log(`${key} has a number value: ${numValue}`);
        admin_id = numValue;
      }
    }
  });
  getSandwich(sandwichID, user_id, admin_id)
    .then((sandwich) => {
      console.log(sandwich);
      const templateVars = { sandwich: sandwich[0], cookie: req.headers.cookie, admin_id};
      res.render('product', templateVars);
    });
});


router.post('/:id/delete', (req, res) => {
  let sandwichID = req.params.id;
  let user_id;
  let cookieArray = req.headers.cookie.split(" ");
  let admin_id;

  cookieArray.forEach(cookie => {
    const [key, value] = cookie.split('=');
    if (key === 'user_id') {
      const numValue = Number(value.substring(0,1)); // Convert the value to a number
      if (!isNaN(numValue)) { // Check if the value is a number
        console.log(`${key} has a number value: ${numValue}`);
        user_id = numValue;
      }
    }
    if (key === 'admin_id') {
      const numValue = Number(value.substring(0,1)); // Convert the value to a number
      if (!isNaN(numValue)) { // Check if the value is a number
        console.log(`${key} has a number value: ${numValue}`);
        admin_id = numValue;
      }
    }
  });
  getSandwich(sandwichID,user_id,admin_id)
    .then((sandwich) => {
      if (sandwich[0].admin_id === admin_id) {
        deleteListing(sandwichID);
        res.render('welcome');
      }
    });
});
module.exports = router;
