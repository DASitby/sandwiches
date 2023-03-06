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
      const templateVars = { listings: listings, cookie: req.headers.cookie};
      res.render('index', templateVars);
    });
});

router.post('/', (req, res) => {
  console.log("search ",req.body);
  //Search options constructor:
  const options = {};
  if (req.body.size) {
    options.size = req.body.size;
  }
  if (req.body.gluten_free === 'TRUE') {
    options.gluten_free = true;
  } else if (req.body.gluten_free === 'FALSE') {
    options.gluten_free = false;
  }
  if (req.body.vegetarian === 'TRUE') {
    options.vegetarian = true;
  } else if (req.body.vegetarian === 'FALSE') {
    options.vegetarian = false;
  }
  getListings(options)
    .then((listings) => {
      const templateVars = { listings: listings, cookie: req.headers.cookie};
      res.render('index', templateVars);
    });
});

module.exports = router;
