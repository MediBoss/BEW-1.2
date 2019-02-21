//----------------------------------------------------------------
// This File defines the User Model and its Methods.
//----------------------------------------------------------------
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

// The Schema defined with needed properties to be stored in Mongo
const UserSchema = new Schema({
  email: {type: String},
  password: {type: String}
});


UserSchema.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign({
    email: this.email,
    id: this._id,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, 'secret');
}

UserSchema.methods.toPrettyJSON = function() {
  return {
    _id: this._id,
    email: this.email,
    token: this.generateJWT(),
  };
};


module.exports = mongoose.model("User", UserSchema);
