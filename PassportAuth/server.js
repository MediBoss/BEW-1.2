require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("./config/passport");
const mongoose = require("mongoose");

const app = express();


mongoose.connect('mongodb://localhost/passportAuthDB', {useNewUrlParser: true});

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// We need to use sessions to keep track of our user's login status
app.use(session({
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

require("./controllers/api.js")(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`===> 🌎  Listening on port ${PORT}.`, PORT);
});

module.exports = app;
