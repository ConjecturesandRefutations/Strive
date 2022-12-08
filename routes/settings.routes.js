const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const fileUploader = require("../config/cloudinary.config");
const session = require("express-session");
const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard");

router.get("/settings", isLoggedIn, (req, res) => {
  const username = req.session.currentUser.username;
  console.log(username);

  User.findOne({ username: username }).then((user) => {
    res.render("settings", user);
  });
});

router.post("/settings", fileUploader.single("avatar"), (req, res) => {
  const { location, birthday, existingAvatar } = req.body;
  console.log(birthday);
  let imageUrl;

  if (req.file) {
    imageUrl = req.file.path;
  } else {
    imageUrl = existingAvatar;
  }

  User.findOneAndUpdate(
    req.session.currentUser.username,
    {
      location,
      birthday,
      avatar: imageUrl,
    },
    { new: true }
  )
    .then((user) => {
      res.redirect("/profile");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
