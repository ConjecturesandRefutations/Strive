const express = require("express");
const router = express.Router();

const Post = require("../models/Post.model");
const User = require("../models/User.model");
const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard");

router.get("/", isLoggedIn, (req, res, next) => {
  res.render("createActivity");
});

 router.post("/", (req, res, next) => {
  console.log(req.body);
  const { title, distance, duration, elevation, description } =
    req.body;

  Post.create({ title, distance, duration, elevation, description })
    .then((newPost) => {
      console.log("Post Created");
      return User.findByIdAndUpdate(req.session.currentUser, { $push: { posts: newPost._id } });
    })
    .then(() => res.redirect("/profile"))
    .catch((error) => next(error));
}); 

module.exports = router;
