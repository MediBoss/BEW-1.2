// LOADING NEEDED MODULES
const express = require("express")
      mongoose = require("mongoose")
      bodyParser = require("body-parser")
      methodOverride = require("method-override")
      exphbs = require("express-handlebars")
      expressValidator = require('express-validator')
      http = require("http")
      port = process.env.PORT || 3000
      app = express()
      require('./database/jeddit-db');
      posts = require("./controllers/posts")
      comments = require("./controllers/comments")

// SETTING UP VIEWS AND MIDDLEWARE
app.engine("handlebars", exphbs({ defaultLayout: 'main' }))
app.set("view engine", "handlebars")
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(expressValidator());
app.use(posts)
app.use(comments)

app.get("/", (request, response) => {
  console.log("Hellow word")
})

// SERVER BOOTING UP
app.listen(port)
module.exports = app
