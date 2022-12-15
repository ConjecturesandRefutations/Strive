const express = require("express");
const router = express.Router();
const User = require("../../models/User.model");
const bcrypt = require("bcrypt");

const { isLoggedIn, isLoggedOut } = require("../../middleware/route-guard.js");

/* GET login page */
router.get("/login" ,   isLoggedOut ,  (req, res, next) => {
  res.render("auth/login");
});

router.post("/login" , isLoggedOut,   (req, res, next) => {
  const { username, password } = req.body;

  //check if we have all info
  if (!username || !password) {
    res.render("auth/login", { errorMessage: "Please fill out all information" });
    return;
  }

  User.findOne({ username }).then((user) => {
    if (!user) {
      res.render("./auth/login", { errorMessage: "User not found" });
    } else if (bcrypt.compareSync(password, user.password)) {
      req.session.currentUser = user;
      res.redirect("/profile");
    } else {
      res.render("./auth/login");
    }
  });
});

module.exports = router;
