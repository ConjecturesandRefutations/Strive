const express = require("express");
const router = express.Router();

/* GET register page */
router.get("/register", (req, res, next) => {
  res.render("auth/register");
});

/* POST register page*/

router.post("/register" , (req, res, next) => {
  console.log("The form data: ", req.body);

 const { username, email, password } = req.body;


 })

module.exports = router;
