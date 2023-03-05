/*
 * All routes for Listings are defined here
 * Since this file is loaded in server.js into /listings,
 *   these routes are mounted onto /listings
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const { getSandwich } = require('../db/queries/03_product');

router.get('/:id', (req, res) => {
  const sandwichID = req.params.id;
  getSandwich(sandwichID)
    .then((sandwich) => {
      const templateVars = { sandwich: sandwich[0]};
      res.render('product', templateVars);
    });

});

module.exports = router;
