const { body, validationResult } = require("express-validator");
const User = require("../models/userSchema");

exports.userValidation = [
  body("name", "Name is required")
    .not()
    .isEmpty()
    .isString()
    .isLength({ min: 3, max: 20 })
    .withMessage("Name must be at least 3 characters long"),
  body("email", "Email is required").isEmail().withMessage("Email is invalid"),
  body("password", "Password is required")
    .not()
    .isEmpty()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("confirmPassword", "Confirm Password is required").custom(
    (value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password and Confirm Password must be same");
      }
      return true;
    }
  ),
  body("email", "Email is already exists").custom(async (email) => {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error("Email already in use");
    }
  }),
];

exports.userValidationCheck = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()[0].msg,
    });
  }

  next();
};
