const express = require("express");
const router = express.Router();

const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard");

/* GET my activities page */
router.get("/",  isLoggedIn,  (req, res, next) => {
  res.render("myActivities");
});

module.exports = router;
