const express = require("express");
const router = express.Router();
const Post = require("../models/Post.model");
const User = require("../models/User.model");

const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard");

/* GET profile page */
router.get("/profile", isLoggedIn, async (req, res, next) => {
  User.findById(req.session.currentUser._id).populate('posts') 
  .then(result => {res.render('users/profile', { posts: result.posts })}
  )
 /*  console.log(req.session.currentUser);
  User.findById(req.session.currentUser._id).populate('posts') 
  .then(foundUser => {
       console.log(foundUser.posts)
      res.render('users/profile', { posts: foundUser.posts });
    })
    .catch(err => {
      console.log(`Err while getting the posts from the DB: ${err}`);
      next(err);
    }); */
});

module.exports = router;

