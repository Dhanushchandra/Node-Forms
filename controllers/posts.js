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
      console.log(result);
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

module.exports.getPosts = (req, res) => {
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
