const mongoose = require("mongoose")

module.exports = mongoose.model('Post', {
  title: String,
  url: String,
  summary: String
})
