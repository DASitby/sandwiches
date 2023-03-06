const express = require('express');
const router  = express.Router();
const { getListings } = require('../db/queries/02_listings');


router.get('/', (req, res) => {
  //Parse cookie for user_id
  let user_id;
  let cookieArray = req.headers.cookie.split(" ");
  console.log(cookieArray);
  for (let i = 0; i < cookieArray.length; i++) {
    if (cookieArray[i].includes("user_id")) {
      let userArray = cookieArray[i].split('=');
      user_id = Number(userArray[1]);
    }
  }
  console.log(user_id);
  const options = {
    user_id: user_id
  };
  getListings(options)
    .then((listings) => {
      const templateVars = { listings: listings, cookie: req.headers.cookie};
      res.render('index', templateVars);
    });
});
module.exports = router;
