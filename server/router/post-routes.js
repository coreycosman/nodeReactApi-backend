const express = require("express");
const passport = require("passport");
const router = express.Router();

const { validate } = require("../models/Post");
const {
  fetchPosts,
  createPost,
  updatePost,
  deletePost
} = require("../controllers/posts-controller");
const passportService = require("../services/passport");
// MIDDLEWARE:
const requireAuth = passport.authenticate("jwt", { session: false });

router
  .route("/")
  .post(requireAuth, validate("create"), createPost)
  .get(requireAuth, fetchPosts);

module.exports = router;
