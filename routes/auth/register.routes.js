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

 // make sure users fill all mandatory fields:
 if (!username || !email || !password) {
   res.render("auth/register", {
     errorMessage: "All fields are mandatory. Please provide your username, email and password."
   });
   return;
 }})

module.exports = router;
