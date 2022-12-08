const express = require("express");
const router = express.Router();
const User = require("../models/User.model"); //
const Post = require("../models/Post.model"); //


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

// GET route to display the form to update a specific post
router.get('/myActivities/:postId/edit', (req, res, next) => {
  const { postId } = req.params;
 
  Post.findById(postId)
    .then(postToEdit => {
      //console.log(postToEdit);
      res.render('edit-post', { post: postToEdit });
    })
    .catch(error => next(error));
});

router.post('/myActivities/:postId/edit', (req, res, next) => {
  const { postId } = req.params;
  const { title, distance, duration, elevation, description } = req.body;
 
  Post.findByIdAndUpdate(postId, { title, distance, duration, elevation, description }, { new: true })
    .then(updatedPost => res.redirect(`/myActivities/`)) // go to the details page to see the updates
    .catch(error => next(error));
});
 

module.exports = router;
