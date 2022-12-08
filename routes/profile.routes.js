const express = require("express");
const router = express.Router();
const Post = require("../models/Post.model");
const User = require("../models/User.model");

const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard");


router.get('/profile', isLoggedIn, (req, res, next) => {
  User.findById(req.session.currentUser)
    .populate('posts')
    .then(dbPosts => {
      res.render('users/profile', { posts: dbPosts.posts });
    })
    .catch(err => {
      console.log(`Err while getting the posts from the DB: ${err}`);
      next(err);
    });
});

module.exports = router;

