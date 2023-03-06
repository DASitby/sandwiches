/*
 * All routes for Search are defined here
 * Since this file is loaded in server.js into /search,
 *   these routes are mounted onto /listings
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  const templateVars = {cookie: req.headers.cookie};
  res.render('search', templateVars);
});

module.exports = router;
