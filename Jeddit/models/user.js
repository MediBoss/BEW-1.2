const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require()

// check if the re-entered password mathes the former
function comparePassword(){

}

const UserSchema = new Schema({
  createdAt: { type: Date },
  updatedAt: { type: Date },
  firstName: { type: String, required: true},
  lastName: {type: String, required: true},
  password: { type: String, select: false },
  username: { type: String, required: true }
});



UserSchema.pre("save", function(next) {
  const now = new Date();
  this.updatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});


module.exports = mongoose.model("User", UserSchema);
