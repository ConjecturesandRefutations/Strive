const express = require("express");
const router = express.Router();
const User = require("../models/User.model"); //

const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard");

/* GET my activities page */
router.get('/', isLoggedIn, (req, res, next) => {
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


router.post('/myActivities/:postId/delete', (req, res, next) => {
  const { postId } = req.params;
 
  Post.findByIdAndDelete(postId)
    .then(() => res.redirect('/myActivities'))
    .catch(error => next(error));
});

module.exports = router;
