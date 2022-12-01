const express = require("express");
const router = express.Router();

/* GET profile page */
router.get("/profile", (req, res, next) => {
  res.render("users/profile");
});

module.exports = router;