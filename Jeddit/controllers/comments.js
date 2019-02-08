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

// NEW COMMENT'S REPLY FORM  ENDPOINT
router.get("/posts/:postId/comments/:commentId/replies/new", (request, response) => {
    let post;
    Post.findById(request.params.postId)
      .then(p => {
        post = p;
        return Comment.findById(request.params.commentId);
      })
      .then(comment => {
        response.render("replies-new", { post, comment });
      })
      .catch(error => {
        console.log(error.message);
      });
  });

  // CREATE COMMENT'S REPLY ENDPOINT
  router.post("/posts/:postId/comments/:commentId/replies", (request, response) => {
    // TURN REPLY INTO A COMMENT OBJECT
    console.log("inside POST");
    const reply = new Comment(request.body);
    reply.author = request.user._id
    // LOOKUP THE PARENT POST
    Post.findById(request.params.postId)
        .then(post => {
            // FIND THE CHILD COMMENT
            Promise.all([
                reply.save(),
                Comment.findById(request.params.commentId),
            ])
                .then(([reply, comment]) => {
                    // ADD THE REPLY
                    console.log(comment.comments);
                    comment.comments.unshift(reply._id);

                    return Promise.all([
                        comment.save(),
                    ]);
                })
                .then(() => {
                    response.redirect(`/posts/${request.params.postId}`);
                })
                .catch(console.error);
            // SAVE THE CHANGE TO THE PARENT DOCUMENT
            return post.save();
        })
  });

module.exports = router;
