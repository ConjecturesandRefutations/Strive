const express = require("express");
const router = express.Router();
const User = require("../models/User.model"); //
const Post = require("../models/Post.model"); //


const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard");

/* GET my activities page */
router.get('/myactivities', isLoggedIn, (req, res, next) => {
  User.findById(req.session.currentUser)
    .populate('posts') // 
    .then(dbPosts => {
      //console.log("Posts from the DB: ", dbPosts.posts);
      res.render('myactivities', { posts: dbPosts.posts });
    })
    .catch(err => {
      console.log(`Err while getting the posts from the DB: ${err}`);
      next(err);
    });
});

// GET route to display the form to update a specific post
router.get('/myactivities/:postId/edit', isLoggedIn, (req, res, next) => {
  const { postId } = req.params;
  console.log(postId);

   Post.findById(postId)
    .then(postToEdit => {
      
      res.render('edit-post', { post: postToEdit });
    })
    .catch(error => next(error)); 
});

router.post('/myactivities/:postId/edit', (req, res, next) => {
  const { postId } = req.params;
  const { title, distance, duration, elevation, description } = req.body;
 
  Post.findByIdAndUpdate(postId, { title, distance, duration, elevation, description }, { new: true })
    .then(updatedPost => res.redirect(`/myactivities/`)) // go to the details page to see the updates
    .catch(error => next(error));
});
 

router.post('/myActivities/:postId/delete', (req, res, next) => {
  const { postId } = req.params;

  Post.findByIdAndDelete(postId)
    .then(() => res.redirect('/myActivities'))
    .catch(error => next(error));
});

module.exports = router;
