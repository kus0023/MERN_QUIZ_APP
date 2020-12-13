const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.json({
      err: "No token provided.",
    });
  }

  jwt.verify(token, process.env.JWT_SECRETE_KEY, (err, decode) => {
    if (err) {
      return res.json({
        err: "Invalid Token.",
      });
    }

    req.userid = decode.userid;
    next();
  });
}

module.exports = verifyToken;
