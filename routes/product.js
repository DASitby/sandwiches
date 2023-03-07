/*
 * All routes for Listings are defined here
 * Since this file is loaded in server.js into /listings,
 *   these routes are mounted onto /listings
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const { getSandwich } = require('../db/queries/03_product');
const { checkFavorite } = require('../db/queries/06_checkFavorite');

router.get('/:id', (req, res) => {
  let sandwichID = req.params.id;
  let user_id;
  let cookieArray = req.headers.cookie.split(" ");
  for (let i = 0; i < cookieArray.length; i++) {
    if (cookieArray[i].includes("user_id")) {
      let userArray = cookieArray[i].split('=');
      user_id = Number(userArray[1]);
    }
  }
  getSandwich(sandwichID)
    .then((sandwich) => {
      let favorite;
      checkFavorite(user_id,sandwichID)
        .then((data) => {
          if (data.length > 0) {
            favorite = true;
          } else {
            favorite = false;
          }
          const templateVars = { sandwich: sandwich[0], cookie: req.headers.cookie, favorite};
          console.log(favorite);
          res.render('product', templateVars);
        });
    });

});

module.exports = router;
