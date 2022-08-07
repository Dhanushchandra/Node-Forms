const route = require("express").Router();
const { verifyToken } = require("../middlewares/token-manager");
const {
  createPost,
  getAllPosts,
  deletePost,
  getPost,
} = require("../controllers/posts");
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

route.get("/", verifyToken, getAllPosts);

route.get("/:id", verifyToken, getPost);

route.delete("/:id", verifyToken, deletePost);

module.exports = route;
