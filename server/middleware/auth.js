const jwt = require("jsonwebtoken");
require("dotenv").config();
const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(404)
        .json({ message: "Unauthorized user Please Login first" });
    }
    jwt.verify(token, process.env.secreteKey, (err, decode) => {
      if (err) {
        return res.status(404).json({ message: "unauthorized user" });
      }
      req.userId = decode.userId;
      req.username = decode.username;
      next();
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
