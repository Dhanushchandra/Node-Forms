const { body, validationResult } = require("express-validator");
const Post = require("../models/postSchema");

exports.postValidation = [
  body("title", "Title is required")
    .isString()
    .isLength({ min: 3, max: 20 })
    .withMessage("Title must be at least 3 characters long"),
  body("body", "Body is required")
    .isString()
    .isLength({ min: 10, max: 100 })
    .withMessage("Body must be at least 3 characters long"),
  body("src", "Src is required")
    .isString()
    .isURL()
    .withMessage("Src must be a valid URL"),
  body("title", "Title is already exists").custom(async (title) => {
    const existingPost = await Post.findOne({ title });

    if (existingPost) {
      throw new Error("Title already in use");
    }
  }),
];

exports.postValidationCheck = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()[0].msg,
    });
  }

  next();
};
