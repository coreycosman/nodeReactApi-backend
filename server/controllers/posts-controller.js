const _ = require("lodash"),
  { User } = require("../models/User"),
  { Post } = require("../models/Post"),
  { ObjectId } = require("mongodb"),
  serverError = require("../modules/helpers/server-error");

module.exports = {
  fetchAllPosts: async (req, res, next) => {
    try {
      const allPosts = await Post.find({});
      res.status(200).json({ allPosts });
    } catch (e) {
      console.log(e);
      serverError(res);
    }
  },
  fetchUserPosts: async (req, res, next) => {
    try {
      const userPosts = await Post.find({ userId: req.user._id });
      userName = `${req.user.firstName}`;
      res.status(200).json({ userPosts, userName });
    } catch (e) {
      console.log(e);
      serverError(res);
    }
  },
  fetchPost: async (req, res, next) => {
    const postId = ObjectId(req.body.postId);
    try {
      const post = await Post.findById(postId);
      res.status(200).json({ post });
    } catch (e) {
      console.log(e);
      serverError(res);
    }
  },
  createPost: async (req, res, next) => {
    const postBody = _.pick(req.body, ["title", "description"]);
    try {
      // NOTE: userId datatype needs to be checked here or on pre middleware to ensure mongo Object ID

      const newPost = new Post(postBody);
      newPost.userId = req.user._id;
      newPost.save();
      res.status(200).json({ created: true });
    } catch (e) {
      console.log(e);
      serverError(res);
    }
  },
  updatePost: async (req, res, next) => {
    res.json({ hello: "hello" });
  },
  deletePost: async (req, res, next) => {
    res.json({ hello: "hello" });
  }
};
