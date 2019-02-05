const jwt = require("jsonwebtoken")
const express = require("express")
const router = express.Router()
const User = require("../models/user")

// ENDPOINT TO RENDER SIGN IN PAGE
router.get("/sign-in", function(request, response){
  response.render("sign-in")
})
// ENDPOINT TO SIGNIN THE USER
// ENDPOINT TO RENDER THE SIGN UP PAGE
router.get("/sign-up", function(request, response){
  response.render("sign-up")
})

// ENDPOINT TO SIGN UP THE USER
router.post("/sign-up", function(request, response){

  const user = new User(request.body)
  user.save().then( (user) => {
    console.log(user);
    // sets up a new token for the signed up user
    var token = jwt.sign({ _id: user._id}, process.env.SECRET, { expiresIn: "60 days"} )
    response.cookie("nToken", token, { maxAge: 900000, httpOnly: true })
    response.redirect("/")
  })
  .catch( (error) => {
    console.log(error.message)
    return response.status(400).send({ error: error })
  })
})

// ENDPOINT TO LOGOUT THE USER
router.get("/sign-out", function(request, response){
  response.clearCookie("nToken")
  response.redirect("/")
})

module.exports = router;
