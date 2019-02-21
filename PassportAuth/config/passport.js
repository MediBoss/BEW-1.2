var passport = require("passport");
var mongoose = require("mongoose")
var User = require("../models/user")
var LocalStrategy = require("passport-local").Strategy;

// Let Passport know we want to use a Local Strategy: login with email and password.
// What other kinds of strategies could you try in class today?
passport.use(new LocalStrategy({
    usernameField: "email"
  },

  function (email, password, done) {
    // TODO: Replace this object with a mongoose User model.
    User.findOne({ email: email })
      .then((user) => {
        if (!user && !user.validPassword(password)) {
          return done(null, false, {
            message: "Incorrect email and/or password"
          });
        }
        console.log(user);
        return done(null, user);
      }).catch(done)
  }));

passport.serializeUser(function (user, cb) {
  console.log("The user is " + user);
  cb(null, user._id);
});

passport.deserializeUser(function (obj, cb) {
  // TODO: return an instance of a Mongoose User model.
  console.log("The Object is " + obj);
  cb(null, obj);
});

// Export our auth configuration.
module.exports = passport;
