const express = require('express');
const router  = express.Router();
const { getListings } = require('../db/queries/02_listings');

router.get('/', (req, res) => {
  req.session.isAdmin = false;
  getListings()
    .then((listings) => {
      console.log(res.body);
      const templateVars = { listings: listings, cookie: req.headers.cookie };
      res.render('index', templateVars);
    });
});

module.exports = router;
