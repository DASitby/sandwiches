const express = require('express');
const router  = express.Router();
const { createFavorite } = require('../db/queries/05_createFavorite.js');
const { checkFavorite } = require('../db/queries/06_checkFavorite.js');
const { deleteFavorite } = require('../db/queries/07_deleteFavorite.js');
const { getListings } = require('../db/queries/02_listings.js');
const { getSandwich } = require('../db/queries/03_product.js');

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

router.post('/:id', (req, res) => {
  let sandwichID = req.params.id;
  let user_id;
  let cookieArray = req.headers.cookie.split(" ");
  for (let i = 0; i < cookieArray.length; i++) {
    if (cookieArray[i].includes("user_id")) {
      let userArray = cookieArray[i].split('=');
      user_id = Number(userArray[1]);
    }
  }
  createFavorite(user_id, sandwichID);
  getSandwich(sandwichID, user_id)
    .then((sandwich) => {
      console.log(sandwich);
      const templateVars = { sandwich: sandwich[0], cookie: req.headers.cookie};
      res.render('product', templateVars);
    });
});

router.post('/delete/:id', (req, res) => {
  let sandwichID = req.params.id;
  let user_id;
  let cookieArray = req.headers.cookie.split(" ");
  for (let i = 0; i < cookieArray.length; i++) {
    if (cookieArray[i].includes("user_id")) {
      let userArray = cookieArray[i].split('=');
      user_id = Number(userArray[1]);
    }
  }
  deleteFavorite(user_id, sandwichID);
  getSandwich(sandwichID, user_id)
    .then((sandwich) => {
      console.log(sandwich);
      const templateVars = { sandwich: sandwich[0], cookie: req.headers.cookie};
      res.render('product', templateVars);
    });
});
module.exports = router;
