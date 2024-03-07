const jwt = require("jsonwebtoken");

const middlewareController = {
  //verify token
  verifyToken: (req, res, next) => {
    const token = req.headers.token;
    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, process.env.ACCESS_TOKEN, (err, user) => {
        if (err)
          return res.status(403).json({ message: "Token không chính xác" });
        req.user = user;
        next();
      });
    } else {
      res.status(400).json({ message: "Bạn chưa xác thực" });
    }
  },
};

module.exports = middlewareController;
