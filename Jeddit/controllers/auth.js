const User = require("../models/user")
const jwt = require("jsonwebtoken")

module.exports = (app) => {

  // ENDPOINT TO RENDER THE SIGN UP FORM
  app.get("/sign-up", function(request, response){
    response.render("sign-up")
  })

  // ENDPOINT TO SIGN UP THE USER
  app.post("/sign-up", function(request, response){

    const user = new User(request.body)
    user.save().then( (user) => {

      // sets up a new token for the signed up user
      var token = jwt.sign({ _id: user._id}, process.env.SECRET, { expiresIn: "60 days"} )
      response.redirect("/")
    })
    .catch( (error) => {

      // Print and return a
      console.log(error.message)
      return response.status(400).send({ error: error })
    })
  })
}
