/*
 * All routes for Create are defined here
 * Since this file is loaded in server.js into /create,
 *   these routes are mounted onto /listings
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const { createListing } = require('../db/queries/01_create');

router.get('/', (req, res) => {
  res.render('create');
});

router.post('/', (req, res) => {
  console.log(req.body);
});
module.exports = router;
