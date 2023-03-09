const express = require('express');
const router  = express.Router();
const { getListings } = require('../db/queries/02_listings');


router.get('/', (req, res) => {
  //Parse cookie for admin_id
  let admin_id;
  let cookieArray = req.headers.cookie.split(" ");
  for (let i = 0; i < cookieArray.length; i++) {
    if (cookieArray[i].includes("admin_id")) {
      let adminArray = cookieArray[i].split('=');
      admin_id = adminArray[1].substring(0,1);
    }
  }
  const options = {
    admin_id: admin_id
  };
  getListings(options)
    .then((listings) => {
      const templateVars = { listings: listings, cookie: req.headers.cookie};
      res.render('index', templateVars);
    });
});
module.exports = router;
