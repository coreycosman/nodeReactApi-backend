const express = require("express");
const passport = require("passport");
const router = express.Router();

const passportService = require("../services/passport");
// MIDDLEWARE:
const { validate } = require("../models/User");
const requireAuth = passport.authenticate("jwt", { session: false });
const { signup, login } = require("../controllers/users-controller");

router.route("/").post(validate("auth"), signup);
router.route("/login").post(validate("auth"), login);
router.route("/hello").get(requireAuth, (req, res) => {
  res.send("hello");
});

module.exports = router;
