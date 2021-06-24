const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  let generateObj = {
    username: user.username,
    password: user.password,
    token_created: Date.now(),
  };
  return jwt.sign(generateObj, process.env.TOKEN_SECRET, {
    expiresIn: "1m",
  });
};
module.exports = generateAccessToken;
