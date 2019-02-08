//--------------------------------------------------
// The Express App that runs each modules
//---------------------------------------------------

// LOADING NEEDED MODULES
require('dotenv').config()
const express = require("express")
      mongoose = require("mongoose")
      bodyParser = require("body-parser")
      methodOverride = require("method-override")
      exphbs = require("express-handlebars")
      expressValidator = require('express-validator')
      cookieParser = require("cookie-parser")
      jwt = require("jsonwebtoken")
      http = require("http")
      port = process.env.PORT || 3000
      app = express()
      checkAuth = require("./controllers/checkAuth")
      auth = require('./controllers/auth.js');
      posts = require("./controllers/posts")
      comments = require("./controllers/comments")
      require('./database/jeddit-db')
      require("./controllers/checkAuth")


// LOADING UP VIEWS AND MIDDLEWARE
app.engine("handlebars", exphbs({ defaultLayout: 'main' }))
app.set("view engine", "handlebars")
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(expressValidator())
app.use(cookieParser())
app.use(checkAuth)
app.use(auth)
app.use(posts)
app.use(comments)

// ENDPOINT TO THE HOME PAGE
app.get("/", (request, response) => {
  var currentUser = request.user;
  console.log(request.cookies);
  Post.find().populate('author')
    .then(posts => {
      response.render("posts-index", { posts, currentUser });
    })
    .catch(err => {
      console.log(err.message);
    });
});

// SERVER BOOTING UP
app.listen(port)
module.exports = app
