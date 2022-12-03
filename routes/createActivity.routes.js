const express = require("express");
const router = express.Router();

const Post = require("../models/Post.model");

const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard");


router.get("/",  isLoggedIn,  (req, res, next) => {
  res.render("createActivity");
});

router.post("/", (req, res, next) => {
  console.log(req.body);
  const { title, distance, duration, elevation, description } = req.body;

  Post.create({ title, distance, duration, elevation, description })
     .then(postFromDB => console.log(`New post created: ${postFromDB.title}.`))
    .then(() => res.redirect("/profile"))
    .catch((error) => next(error));
});

module.exports = router;
