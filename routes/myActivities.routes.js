const express = require("express");
const router = express.Router();

/* GET my activities page */
router.get("/", (req, res, next) => {
  res.render("myActivities");
});

module.exports = router;
