const route = require("express").Router();
const { verifyToken } = require("../middlewares/token-manager");
const {
  getAllPosts,
  createUserPost,
  getUserPosts,
  deleteUserPost,
  getUserPost,
  updateUserPost,
} = require("../controllers/posts");
const {
  postValidation,
  postValidationCheck,
} = require("../middlewares/post-validation");

route.post(
  "/user/create/:id",
  verifyToken,
  postValidation,
  postValidationCheck,
  createUserPost
);

route.get("/user/:id", verifyToken, getUserPosts);

route.put("/user/:id/:postId", verifyToken, updateUserPost);

route.delete("/user/:id/:postId", verifyToken, deleteUserPost);

route.get("/user/:id/:postId", verifyToken, getUserPost);

route.get("/", verifyToken, getAllPosts);

module.exports = route;
