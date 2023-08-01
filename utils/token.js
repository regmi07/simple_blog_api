const jwt = require("jsonwebtoken");

function generateToken(username) {
  console.log("max age: ", process.env.MAX_AGE);
  const jwtToken = jwt.sign({ username }, process.env.TOKEN_SECRET, {
    expiresIn: "2d",
  });

  return jwtToken;
}

module.exports = { generateToken };
