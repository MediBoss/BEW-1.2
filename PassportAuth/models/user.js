//----------------------------------------------------------------
// This File defines the User Model and its Methods.
//----------------------------------------------------------------
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// The Schema defined with needed properties to be stored in Mongo
const UserSchema = new Schema({
  email: {type: String},
  passport: {type: String}
});


module.exports = mongoose.model("User", UserSchema);
