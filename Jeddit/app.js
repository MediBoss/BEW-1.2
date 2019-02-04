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
      auth = require('./controllers/auth.js');
      posts = require("./controllers/posts")
      comments = require("./controllers/comments")
      require('./database/jeddit-db');

// SETTING UP VIEWS AND MIDDLEWARE
app.engine("handlebars", exphbs({ defaultLayout: 'main' }))
app.set("view engine", "handlebars")
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(expressValidator())
app.use(cookieParser())
app.use(posts)
app.use(comments)
app.use(auth)

app.get("/", (request, response) => {
  console.log("Hellow word")
})

// SERVER BOOTING UP
app.listen(port)
module.exports = app
