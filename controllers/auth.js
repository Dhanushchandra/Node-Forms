const jwt = require("jsonwebtoken");

module.exports = {
  isAuthChecker: (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET,
      (err, decoded) => {
        if (err) {
          return res.status(401).json({
            error: "Failed to authenticate token",
            isAuth: false,
          });
        }
        return res.json({
          decoded,
          isAuth: true,
        });
      }
    );
  },
};
