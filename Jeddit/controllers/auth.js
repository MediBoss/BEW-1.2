const User = require("../models/user")

module.exports = (app) => {

  // ENDPOINT TO RENDER THE SIGN UP FORM
  app.get("/sign-up", function(request, response){
    response.render("sign-up")
  })

  // ENDPOINT TO SIGN UP THE USER
  app.post("/sign-up", function(request, response){

    const user = new User(request.body)
    user.save().then( (user) => {
      console.log(user);
      response.redirect("/")
    })
    .catch( (error) => {
      console.log(error.message)
    })
  })
}
