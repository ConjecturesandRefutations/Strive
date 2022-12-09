const express = require("express");
const router = express.Router();
const User = require("../../models/User.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const { isLoggedIn, isLoggedOut } = require("../../middleware/route-guard");

/* GET register page */
router.get("/register", isLoggedOut, (req, res, next) => {
  res.render("auth/register");
});

/* POST register page*/

router.post("/register", isLoggedOut, async (req, res, next) => {
  const { username, email, password } = req.body;

 // make sure users fill all mandatory fields:
if (!username || !email || !password) {
  console.log('missing details')
  res.render("auth/register", {
    errorMessage: "All fields are mandatory. Please provide your username, email and password."
  });
  return;
} 

// make sure passwords are strong:
const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
if (!regex.test(password)) {
  res.status(500).render("auth/register", {
    errorMessage:
      "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter."
  });
  return;
}

  //Hashin user password
  const hashPassword = await bcrypt.hash(password, saltRounds);

  User.create({ username: username, email: email, password: hashPassword })
    .then((result) => {
      req.session.currentUser = result;
      res.redirect("/profile");
      console.log("🧑🏻‍💻New user has been created");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
