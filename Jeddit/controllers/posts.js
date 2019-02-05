const express = require("express")
      router = express.Router()
      Post = require("../models/post")


// NEW POST ENDPOINT
router.get("/posts/new", (request, response) => {
  response.render('posts-new', {})
})

// CREATE POST ENDPOINT
// CREATE
router.post("/posts/new", (request, response) => {
  if (request.user) {
    var post = new Post(request.body);

    post.save(function(err, post) {
      return response.redirect(`/`);
    });
  } else {
    return response.status(401);
  }
});


// SHOW SINGLE POST ENDPOINT
router.get("/posts/:id", (request, response) => {
  Post.findById(request.params.id).populate('comments')
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
