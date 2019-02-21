// Make sure to import the Passport config:
var passport = require("../config/passport");
var User = require("../models/user")

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    const email = req.body.email
    const password = req.body.password




    res.json({
      "message1": "Logged in successfully!"
    });
  });

  app.post("/api/signup", function (req, res) {
    const user = req.body

    if(!user.email){
      return res.status(422).json({ errors: {
        email: "is required"
      }})
    }

    if(!user.password){
      return res.send(422).json({ errors: {
        password: "is required"
      }})
    }

    const authenticatedUsed = new User(user)

    return authenticatedUsed.save()
      .then( () => res.json( { user: authenticatedUsed.toPrettyJSON() }))
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
