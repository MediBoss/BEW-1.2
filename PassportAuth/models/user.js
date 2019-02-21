//----------------------------------------------------------------
// This File defines the User Model and its Methods.
//----------------------------------------------------------------
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Schema = mongoose.Schema;

// The Schema defined with needed properties to be stored in Mongo
const UserSchema = new Schema({
  email: {type: String},
  password: {type: String}
});

UserSchema.pre("save", function(next){
  // Encrypt and Salt the User's Password
 const user = this
 if (!user.isModified("password")) {
   return next()
 }

 // Generates a salted and hashed password for the user
 bcrypt.genSalt(10, (err, salt) => {
   bcrypt.hash(user.password, salt, (err, hash) => {
     user.password = hash
     next()
   })
 })
})

// Create a JWT for future Auth
UserSchema.methods.generateJWT = function() {

  return jwt.sign({ _id: this._id, email: this.email}, process.env.SECRET,{
    expiresIn: "60 days"
  })
}

// Return the user object in JSON format to validate that the user was created
UserSchema.methods.toPrettyJSON = function() {
  return {
    _id: this._id,
    email: this.email,
    token: this.generateJWT()
  }
}



module.exports = mongoose.model("User", UserSchema);
