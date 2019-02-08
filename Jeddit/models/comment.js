const mongoose = require("mongoose")
      Schema = mongoose.Schema


const CommentSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true},
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment"}]
})

module.exports = mongoose.model("Comment", CommentSchema);
