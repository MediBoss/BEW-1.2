const jwt = require("jsonwebtoken")
const express = require("express")
const router = express.Router()
const User = require("../models/user")

// ENDPOINT TO RENDER SIGN IN PAGE
router.get("/sign-in", function(request, response){
  response.render("sign-in")
})

// ENDPOINT TO SIGNIN THE USER
router.post("/sign-in", function(request, response){

  // Gets the user's data from the login form
  const username = request.body.username
  const password = request.body.password

  // Query the user in the database
  User.findOne( { username }, "username password")
    .then( (user) => {

      // checks if something else beside user object is returned
      if(!user){
        return response.status(401).send({ message: "username or password is incorect" })
      }
      // Creates a token to keep the user logged in for 60 days
      const token =  jwt.sign({ _id: user._id, username: user.username}, process.env.SECRET,{
        expiresIn: "60 days"
      })

      // Sets a cookie in the browser for future references
      response.cookie("nToken", token, { maxAge: 900000, httpOnly: true} )
      response.redirect("/")
    })
    .catch( (error) =>{
      console.log(error.message);
    })
})
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
