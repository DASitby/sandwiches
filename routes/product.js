/*
 * All routes for Listings are defined here
 * Since this file is loaded in server.js into /listings,
 *   these routes are mounted onto /listings
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const { getSandwich } = require('../db/queries/product');

router.get('/:id', (req, res) => {
  const sandwich = req.params.id;
  getSandwich(sandwich)
    .then((sandwich) => {
      const templateVars = { sandwich: sandwich };
      res.render('index', templateVars);
    });

});

module.exports = router;
