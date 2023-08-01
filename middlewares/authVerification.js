const jwt = require("jsonwebtoken");

function verifyCookie(req) {
  return req.cookies["auth"];
}

function verifyJwtToken(req, res, next) {
  let token;

  // authenticate through bearer token
  // we generally send a token through request object's headers with key authorization and attach Bearer before token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
    console.log({ token });
  } else {
    // user sometimes may send a token through request object header with key x-access-token
    token = req.headers["x-access-token"] || verifyCookie(req) || null;
    console.log({ token });
  }

  if (!token) {
    return res
      .status(403)
      .send("Authentication is required to access this route");
  }

  try {
    const userInfo = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log(userInfo);
    req.user = userInfo;
  } catch (err) {
    console.log(err);
    return res.status(401).send("Invalid access token!");
  }

  return next();
}

module.exports = { verifyJwtToken };
