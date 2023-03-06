const express = require('express');
const router  = express.Router();
const { getListings } = require('../db/queries/02_listings');

router.get('/', (req, res) => {
  req.session.isAdmin = true;
  getListings()
    .then((listings) => {
      const templateVars = { listings: listings, cookie: req.headers.cookie };
      res.render('index', templateVars);
    });
});

module.exports = router;
