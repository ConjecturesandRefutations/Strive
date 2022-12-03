const express = require("express");
const router = express.Router();

const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard");

/* GET profile page */
router.get("/profile", isLoggedIn, (req, res, next) => {
  console.log(req.session.currentUser);
  res.render("users/profile", { userInSession: req.session.currentUser });
});

module.exports = router;
