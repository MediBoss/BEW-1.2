//------------------/
// The Posts Model  /
//------------------/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Populate = require("../utils/autoPopulate")

const PostSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  url: { type: String, required: true },
  summary: { type: String, required: true },
  subreddit: { type: String, required: true},
  upVotes : [{ type: Schema.Types.ObjectId, ref: "User"}],
  downVotes : [{ type: Schema.Types.ObjectId, ref: "User"}],
  voteScore : {type: Number},
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  createdAt: { type: Date},
  updatedAt: { type: Date}
})


PostSchema
  .pre('findOne', Populate('author'))
  .pre('find', Populate('author'))

PostSchema.pre("save", (next) => {
  const now = new Date()
  this.updatedAt = now

  if(!this.createdAt){
    this.createdAt = now
  }
  next()
})

module.exports = mongoose.model("Post", PostSchema);
