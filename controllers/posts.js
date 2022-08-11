const Post = require("../models/postSchema");
const User = require("../models/userSchema");

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

// ------------------------------------------------------------------------------------

module.exports.createUserPost = (req, res) => {
  const post = new Post({
    title: req.body.title,
    body: req.body.body,
    src: req.body.src,
  });
  post.save((err, post) => {
    if (err) {
      res.status(400).send(err);
    }
    User.findByIdAndUpdate(
      req.params.id,
      { $push: { posts: post._id } },
      (err, user) => {
        if (err) {
          res.status(400).send(err);
        }
        res.status(200).json({
          message: "Post created successfully",
          post: post,
        });
      }
    );
  });
};

module.exports.getUserPosts = (req, res) => {
  User.findById(req.params.id)
    .populate("posts")
    .then((user) => {
      res.status(200).json({
        message: "Posts fetched successfully",
        posts: user.posts,
      });
    });
};

module.exports.getUserPost = (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      res.status(404).json({
        message: "User not found",
      });
    } else {
      Post.findById(req.params.postId, (err, post) => {
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
    }
  });
};

module.exports.deleteUserPost = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.params.id },
    { $pull: { posts: req.params.postId } }
  )
    .populate("posts")
    .then((user) => {
      if (user) {
        Post.findByIdAndDelete(req.params.postId)
          .then((post) => {
            res.status(200).json({
              message: "Post deleted successfully",
              post: post,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
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

module.exports.updateUserPost = (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      res.status(404).json({
        message: "User not found",
      });
    } else {
      Post.findByIdAndUpdate(req.params.postId, req.body, (err, post) => {
        if (err) {
          res.status(404).json({
            message: "Post not found",
          });
        } else {
          res.status(200).json({
            message: "Post updated successfully",
            post: post,
          });
        }
      });
    }
  });
};

// --------------------------------------------------------------

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

module.exports.updatePost = (req, res) => {
  Post.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
    if (err) {
      res.status(404).json({
        message: "Post not found",
      });
    } else {
      res.status(200).json({
        message: "Post updated successfully",
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
