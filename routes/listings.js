/*
 * All routes for Listings are defined here
 * Since this file is loaded in server.js into /listings,
 *   these routes are mounted onto /listings
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const { getListings } = require('../db/queries/02_listings');

router.get('/', (req, res) => {
  getListings()
    .then((listings) => {
      const templateVars = { listings: listings };
      res.render('index', templateVars);
    });
});

router.post('/', (req, res) => {
  console.log(req.body);
  res.redirect('/listings');
});

module.exports = router;
