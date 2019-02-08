const express = require("express")
      router = express.Router()
      Post = require("../models/post")
      Comment = require("../models/comment")

// CREATE COMMENT ENDPOINT
router.post("/posts/:postId/comments", function(request, response){

  var comment = new Comment(request.body)
  comment.author = request.user._id
  comment.save()
    .then( (comment) => {
      return Promise.all([
        Post.findById(request.params.postId)
      ])
    })
    .then( ([post, user]) => {
      post.comments.unshift(comment)
      return Promise.all([
        post.save()
      ])
    })
    .then( (post) => {
      response.redirect(`/posts/${request.params.postId}`)
    })
    .catch( (error) => {
      console.log(error);
    })
})

module.exports = router;
