const route = require("express").Router();
const { verifyToken } = require("../middlewares/token-manager");
const {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
  getPost,
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
  "/create",
  verifyToken,
  postValidation,
  postValidationCheck,

  createPost
);

// ----------------------------------------------------------------
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

// --------------------------------------------------------------
route.put("/:id", verifyToken, updatePost);

route.get("/:id", verifyToken, getPost);

route.delete("/:id", verifyToken, deletePost);

module.exports = route;
