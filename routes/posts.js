const route = require("express").Router();
const { verifyToken } = require("../middlewares/token-manager");
const { createPost, getPosts } = require("../controllers/posts");
const {
  postValidation,
  postValidationCheck,
} = require("../middlewares/post-validation");

route.post(
  "/create",
  verifyToken,
  postValidation,
  postValidationCheck,

  createPost
);

route.get("/", verifyToken, getPosts);

module.exports = route;
