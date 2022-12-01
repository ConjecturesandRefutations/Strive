const express = require("express");
const router = express.Router();
const User = require("../../models/User.model");
const bcrypt = require("bcrypt");

/* GET login page */
router.get("/login", (req, res, next) => {
  res.render("auth/login");
});

router.post("/login", (req, res, next) => {
  const { username, password } = req.body;

  //check if we have all info
  if (!username || !password) {
    res.render("auth/login", { err: "please fill out all information" });
    return;
  }

  User.findOne({ username }).then((user) => {
    if (!user) {
      console.log("🚨 Cant find the user");
      res.render("./auth/login");
    } else if (bcrypt.compareSync(password, user.password)) {
      res.redirect("/profile");
    } else {
      res.render("./auth/login");
    }
  });
});

module.exports = router;
