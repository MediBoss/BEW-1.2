const express = require("express")
      router = express.Router()


// NEW POST ENDPOINT
router.get("/posts/new", (request, response) => {
  response.render('posts-new', {})
})

// CREATE POST ENDPOINT
router.post("/posts", (request, response) => {
  console.log(request.body);
})


// SHOW SINGLE POST ENDPOINT

// SHOW ALL POSTS ENDPOINT



module.exports = router
