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
    User.findOne({ email: email }, function(err, user){

      if (err) { return done(err) }

      if (!user && !user.validPassword(password)) {
        return done(null, false, {
          message: "Incorrect email and/or password"
        });
      }
      console.log(user);
      return done(null, user);
    })
  }));

passport.serializeUser(function (user, cb) {

  cb(null, user._id);
});

passport.deserializeUser(function (obj, cb) {
  // TODO: return an instance of a Mongoose User model.
  User.findById(obj._id, function(err, user){
    cb(err, user)
  })
})

// Export our auth configuration.
module.exports = passport;
