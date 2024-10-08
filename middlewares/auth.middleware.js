const { validateToken } = require("../services/auth");

function checkForAuthenticationCookie(cookieName) {
  //   let counter = 1;
  return (req, res, next) => {
    // console.log(counter++);
    const tokenCookieValue = req.cookies[cookieName];
    if (!tokenCookieValue) {
      //   console.log("!tokenCookieValue");
      return next();
    }
    try {
      //   console.log("userPayload goin to validate");
      const userPayload = validateToken(tokenCookieValue);
      //   console.log("userPayload is validated");
      req.user = userPayload;
      //   console.log(req.user);
    } catch (error) {
      //   console.log("Token is not generated yet");
    }

    return next();
  };
}

module.exports = {
  checkForAuthenticationCookie,
};
