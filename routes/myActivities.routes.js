const express = require("express");
const router = express.Router();
const User = require("../models/User.model"); //

const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard");

/* GET my activities page */
router.get('/', (req, res, next) => {
  User.findById(req.session.currentUser)
    .populate('posts') // 
    .then(dbPosts => {
      //console.log("Posts from the DB: ", dbPosts.posts);
      res.render('myActivities', { posts: dbPosts.posts });
    })
    .catch(err => {
      console.log(`Err while getting the posts from the DB: ${err}`);
      next(err);
    });
});

module.exports = router;
