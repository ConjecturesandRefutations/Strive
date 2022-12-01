const express = require("express");
const router = express.Router();
const User = require("../../models/User.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;

/* GET register page */
router.get("/register", (req, res, next) => {
  res.render("auth/register");
});

/* POST register page*/

router.post("/register", async (req, res, next) => {
  const { username, email, password } = req.body;

  //Hashin user password
  const hashPassword = await bcrypt.hash(password, saltRounds);

  User.create({ username: username, email: email, password: hashPassword })
    .then((result) => {
      res.render("/users/profile");
      console.log("🧑🏻‍💻New user has been created");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
