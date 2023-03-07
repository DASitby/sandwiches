const express = require('express');
const router  = express.Router();
const { createFavorite } = require('../db/queries/05_createFavorite.js');
const { getListings } = require('../db/queries/02_listings.js');


router.get('/', (req, res) => {
  //Parse cookie for user_id
  let user_id;
  let cookieArray = req.headers.cookie.split(" ");
  for (let i = 0; i < cookieArray.length; i++) {
    if (cookieArray[i].includes("user_id")) {
      let userArray = cookieArray[i].split('=');
      user_id = Number(userArray[1]);
    }
  }
  const options = {
    user_id: user_id
  };
  getListings(options)
    .then((listings) => {
      const templateVars = { listings: listings, cookie: req.headers.cookie};
      res.render('index', templateVars);
    });
});

router.post('/', (req, res) => {
  let path = req.headers.referer;
  let listingID = Number(path.substring(31));
  let user_id;
  let cookieArray = req.headers.cookie.split(" ");
  for (let i = 0; i < cookieArray.length; i++) {
    if (cookieArray[i].includes("user_id")) {
      let userArray = cookieArray[i].split('=');
      user_id = Number(userArray[1]);
    }
  }
  createFavorite(user_id, listingID);
  res.redirect('back');
});
module.exports = router;
