const _ = require("lodash");

const { User } = require("../models/User");
const { Post } = require("../models/Post");
const { generateUniqueId } = require("../modules/helpers/unique-id");
const serverError = require("../modules/helpers/server-error");

module.exports = {
  fetchAllPosts: async (req, res, next) => {
    try {
      const posts = await Post.find({});
      res.status(200).json({ posts });
    } catch (e) {
      console.log(e);
      serverError(res);
    }
  },
  fetchUserPosts: async (req, res, next) => {
    try {
      const userPosts = await Post.find({ userId: req.user._id });
      userName = req.user.email;
      res.status(200).json({ userPosts, userName });
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
