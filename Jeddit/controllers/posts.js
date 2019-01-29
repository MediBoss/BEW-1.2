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
  Post.findById(request.params.id)
    .then( (post) => {
      response.render("posts-show", { post })
    })
    .catch( (error) => {
      console.log(error.message)
    })
})

// SHOW ALL POSTS ENDPOINT
router.get("/posts", (request, response) => {
  Post.find({})
    .then( (posts) => {
      response.render("posts-index", { posts})
    })
    .catch( (error) => {
      console.log(error.message);
    })
})


// SHOW ALL SUBREDDIT ENDPOINT
router.get("/n/:subreddit", function(request, response){
  Post.find( {subreddit: request.params.subreddit} )
    .then( (posts) => {
      response.render("posts-index", { posts })
    })
    .catch( (error) =>{
      console.log(error);
    })
})


module.exports = router
