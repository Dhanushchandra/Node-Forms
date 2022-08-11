const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const { getToken } = require("../middlewares/token-manager");

module.exports.createUser = (req, res) => {
  const data = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  data.save().then((result) => {
    res.status(200).json({
      message: "Registered successfully",
      data: result,
    });
  });
};

module.exports.loginUser = (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      return res.status(422).json({
        error: "Email/Password is incorrect",
      });
    }
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (result) {
        const token = getToken(user.email, user._id);
        return res.status(200).json({
          message: "Login Successful",
          id: user._id,
          name: user.name,
          token: token,
        });
      }
      return res.status(422).json({
        error: "Email/Password is incorrect",
      });
    });
  });
};

module.exports.mainPage = (req, res) => {
  res.status(200).json({
    message: "Welcome to the main page",
  });
};
