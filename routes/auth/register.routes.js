const express = require("express");
const router = express.Router();
const User = require("../../models/User.model");

/* GET register page */
router.get("/register", (req, res, next) => {
  res.render("auth/register");
});

/* POST register page*/

router.post("/register", (req, res, next) => {
  console.log("The form data: ", req.body);

  const { username, email, password } = req.body;
  User.create({ username: username, email: email, password: password }).then(
    (result) => {
      console.log("🧑🏻‍💻New user has been created");
    }
  );
});

module.exports = router;
