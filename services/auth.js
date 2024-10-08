const JWT = require("jsonwebtoken");

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    fullName : user.fullName,
    email: user.email,
    profileImageURL: user.profileImageURL,
    role: user.role,
  };

  const token = JWT.sign(payload, process.env.SECRET_KEY);
  return token;
}

function validateToken(token) {
  const payload = JWT.verify(token, process.env.SECRET_KEY);
  return payload;
}

module.exports = {
  createTokenForUser,
  validateToken,
};
