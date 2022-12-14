const express = require("express");
const router = express.Router();
const Post = require("../models/Post.model");
const User = require("../models/User.model");

const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard");

const distances = [];
const elevations = [];
const durations = [];

router.get("/profile", isLoggedIn, (req, res, next) => {
  User.findById(req.session.currentUser)

    .populate({ path: "posts", options: { sort: { createdAt: -1 } } })
    .then((user) => {
      if (user.posts.length === 0) {
        res.render("users/profile", {
          posts: user.posts,
          user: user,
          sumDistances: 0,
          sumDurations: 0,
          sumElevations: 0,
        });
      } else {
        user.posts.forEach((post) => {
          distances.push(post.distance);
          durations.push(post.duration);
          elevations.push(post.elevation);
        });

        //this is not a perfect solution to find out sums but ok for demonstration

        const sumDistances = distances.reduce((acc, curr) => {
          return acc + curr;
        });

        const sumDurations = durations.reduce((acc, curr) => {
          return acc + curr;
        });

        const sumElevations = elevations.reduce((acc, curr) => {
          return acc + curr;
        });
        res.render("users/profile", {
          user: user,
          sumDistances: sumDistances,
          sumDurations: sumDurations,
          sumElevations: sumElevations,
        });
        console.log(user.username);
      }
    })

    .catch((err) => {
      console.log(`Err while getting the posts from the DB: ${err}`);
      next(err);
    });
});

module.exports = router;
