const express = require("express")
      router = express.Router()
      Post = require("../models/post")


// NEW POST ENDPOINT
router.get("/posts/new", (request, response) => {
  response.render('posts-new', {})
})

// CREATE POST ENDPOINT
router.post("/posts", (request, response) => {
  const post = new Post(request.body);
  const currentDate = Date()
  post.createdAt = currentDate
  post.updatedAt = currentDate
  post.save((err, post) => {
    return response.redirect(`/`);
  })
})


// SHOW SINGLE POST ENDPOINT
router.get("/posts/:id", (request, response) => {

})

// SHOW ALL POSTS ENDPOINT



module.exports = router
