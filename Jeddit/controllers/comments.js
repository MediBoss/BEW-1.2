const express = require("express")
      router = express.Router()
      Post = require("../models/post")
      Comment = require("../models/comment")

// CREATE COMMENT ENDPOINT
router.post("/posts/:postId/comments", function(request, response){

  const comment = new Comment(request.body)
  comment.author = request.body.user._id
  comment.save()
    .then( (comment) => {
      return Post.findById(request.params.postId)
      response.redirect(`/`)
    })
    .then( (post) => {
      post.comments.unshift(comment)
      return post.save()
    })
    .then( (post) => {
      response.redirect(`/`)
    })
    .catch( (error) => {
      console.log(error);
    })
})

module.exports = router;
