/** @format */
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "Acces denied" });
  }

  try {
    const decoded = jwt.verify(token, "mySecret");
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Acces denied" });
  }
};

module.exports = auth;
