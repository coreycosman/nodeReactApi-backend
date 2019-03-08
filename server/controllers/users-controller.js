const _ = require("lodash");

const { User } = require("../models/User");
const { generateUniqueId } = require("../modules/helpers/unique-id");
const serverError = require("../modules/helpers/server-error");

module.exports = {
  signup: async (req, res, next) => {
    const resBody = _.pick(req.body, ["email", "password", "confirmation"]);
    // check password and confirmation match
    if (resBody.password != resBody.confirmation) {
      return res.status(400).json({
        errors: [
          { id: generateUniqueId(), errMessage: "please confirm password" }
        ]
      });
    }
    // check email uniqueness
    const checkEmail = await User.checkEmail(resBody.email);
    if (checkEmail) {
      return res.status(400).json({
        errors: [{ id: generateUniqueId(), errMessage: "email in use" }]
      });
    }
    try {
      const userBody = _.pick(resBody, ["email"], ["password"]);
      const newUser = new User(userBody);
      const token = newUser.generateAuthToken();
      await newUser.save();
      res.status(200).json(token);
    } catch (e) {
      console.log(e);
      serverError(res, generateUniqueId());
    }
  },

  login: async (req, res, next) => {
    const body = _.pick(req.body, ["email", "password"]);
    // check email is registered
    const user = await User.checkEmail(body.email);
    if (!user) {
      return res.status(400).json({
        errors: [{ id: generateUniqueId(), errMessage: "email not found" }]
      });
    }
    // check passwords match
    const checkPasswords = await user.comparePasswords(body.password);

    if (!checkPasswords) {
      return res.status(400).json({
        errors: [{ id: generateUniqueId(), errMessage: "incorrect password" }]
      });
    }
    try {
      const token = user.generateAuthToken();
      return res.status(200).json(token);
    } catch (e) {
      console.log(e);
      serverError(res, generateUniqueId());
    }
  }
};
