const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  let generateObj = {
    username: user.username,
    password: user.password,
  };
  return jwt.sign(generateObj, process.env.TOKEN_SECRET);
};
module.exports = generateAccessToken;
