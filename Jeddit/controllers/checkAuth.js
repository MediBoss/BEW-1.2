
// Constantly checks if the user is Autheticated
var checkAuth = (request, response, next) => {
  if (typeof request.cookies.nToken === "undefined" || request.cookies.nToken === null) {
    request.user = null;
  } else {
    var token = request.cookies.nToken;
    var decodedToken = jwt.decode(token, { complete: true }) || {};
    request.user = decodedToken.payload;
  }

  next();
};

module.exports = checkAuth
