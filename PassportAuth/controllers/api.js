// Make sure to import the Passport config:
var passport = require("../config/passport");
var User = require("../models/user")

module.exports = function (app) {

  app.post("/api/login", passport.authenticate("local"), function (req, res) {

    const user = req.body
    // Check if the user did not provide an email
    if(!user.email){
      return res.status(422).json({ errors: {
        email: "is required"
      }})
    }

    // Check if the user did not provide an email
    if(!user.password){
      return res.status(422).json({ errors: {
        password: "is required"
      }})
    }

    return passport.authenticate('local', { session: false}, (err, authedUser, info) => {
      if (err){
        return res.status(401).json({ errors: "Your Email or Password is incorrect"})
      }

      if(authedUser){
        const user = authedUser
        user.token = authedUser.generateJWT()

        return res.json({ user: user.toPrettyJSON() })
      }

      res.status(400).info
    })
  });


  app.post("/api/signup", function (req, res) {
    const user = req.body
    // Check if the user did not provide an email
    if(!user.email){
      return res.status(422).json({ errors: {
        email: "is required"
      }})
    }

    // Check if the user did not provide an email
    if(!user.password){
      return res.status(422).json({ errors: {
        password: "is required"
      }})
    }

    // save the user and return a JSON reponse of the user object with a 200 status code
    const authenticatedUsed = new User(user)
    return authenticatedUsed.save()
      .then( () => res.status(200).json( { user: authenticatedUsed.toPrettyJSON() }))
  })


  app.get("/api/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/secure", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({
        "message": "not logged in"
      });
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user._id
      });
    }
  });

};
