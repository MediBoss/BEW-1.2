
// Constantly checks if the user is Autheticated
var checkAuth = (request, response, next) => {
  console.log("Checking authentication");
  if (typeof request.cookies.nToken === "undefined" || request.cookies.nToken === null) {
    request.user = null;
    console.log("User Not Autheticated");
  } else {
    var token = request.cookies.nToken;
    var decodedToken = jwt.decode(token, { complete: true }) || {};
    request.user = decodedToken.payload;
    console.log("User Fully Autheticated");
  }

  next();
};

module.exports = checkAuth
