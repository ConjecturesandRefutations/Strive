const express = require("express");
const router = express.Router();

const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard");


router.get("/",  isLoggedIn,  (req, res, next) => {
  res.render("createActivity");
});

module.exports = router;
