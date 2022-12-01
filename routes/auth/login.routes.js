const express = require("express");
const router = express.Router();

const app = express()

/* GET login page */
router.get("/login", (req, res, next) => {
  res.render("auth/login");
});

router.get("/login", (req, res, next) => {
  res.render("auth/login");
});

router.post("/login", (req, res, next) => {
  const { username, password } = req.body;
  console.log(req.body)

  //check if we have all info
  if (!username || !password) {
    res.render("auth/login", { err: "please fill out all information" });
    return;
  }})


module.exports = router;
