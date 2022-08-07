const Post = require("../models/postSchema");

module.exports.createPost = (req, res) => {
  const post = new Post({
    title: req.body.title,
    body: req.body.body,
    src: req.body.src,
  });

  post
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Post created successfully",
        createdPost: {
          title: result.title,
          body: result.body,
          src: result.src,
          _id: result._id,
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.getAllPosts = (req, res) => {
  Post.find()
    .then((posts) => {
      res.status(200).json({
        message: "Posts fetched successfully",
        posts: posts,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.getPost = (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) {
      res.status(404).json({
        message: "Post not found",
      });
    } else {
      res.status(200).json({
        message: "Post fetched successfully",
        post: post,
      });
    }
  });
};

module.exports.deletePost = (req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then((post) => {
      res.status(200).json({
        message: "Post deleted successfully",
        post: post,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
