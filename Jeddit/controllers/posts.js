const express = require("express")
      router = express.Router()
      Post = require("../models/post")
      User = require("../models/user")


// NEW POST ENDPOINT
router.get("/posts/new", (request, response) => {
  response.render('posts-new', {})
})

// CREATE POST ENDPOINT
// CREATE
router.post("/posts/new", (request, response) => {
  if (request.user) {
    var post = new Post(request.body);
    post.author = request.user._id
    console.log(post.author);
    post.save().then( (post) => {
      return User.findById(request.user._id)
    })
    .then( (user) => {
      console.log(user.posts);
      user.posts.unshift(post)
      console.log("printed posts");
      user.save()
      response.redirect(`/posts/${post._id}`)
    })
    .catch( (error) => {
      console.log(error.message);
    })
  } else {
    return response.status(401);
  }
});


// SHOW SINGLE POST ENDPOINT
router.get("/posts/:id", (request, response) => {

  var currentUser = request.user
  Post.findById(request.params.id).populate({ path: 'comments', populate: { path: 'author'}}).populate('author')
    .then( (post) => {
      response.render("posts-show", { post, currentUser })
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


// SHOW ALL POSTS ON SUBREDDIT ENDPOINT
router.get("/n/:subreddit", function(request, response){

  var currentUser = request.user
  Post.find( {subreddit: request.params.subreddit} ).populate("author")
    .then( (posts) => {
      response.render("posts-index", { posts, currentUser })
    })
    .catch( (error) =>{
      console.log(error);
    })
})


module.exports = router
