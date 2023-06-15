const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");
var jwt = require("jsonwebtoken");
const { constants } = require("../utils/constants");
const { createToken } = require("./user.controller");

const registration = asyncHandler(async (req, res) => {
  const { name, password, email, avatar } = req.body;

  // check weather user exist in the databse or not

  let isUserExist = await User.findOne({ email: email });

  if (Boolean(isUserExist)) {
    throw new Error("User has already exist");
  } else {
    let user = await User.create({ name, password, email });
    // after successfully user created
    if (user) {
      const data = {
        name: user.name,
        email: user.email,
        token: await createToken(user._id),
      };
      res.status(constants.CREATED).send(data);
    } else {
      // if api failed
      throw new Error("Failed to create new user");
    }
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // check weather user exist in the databse or not

  let user = await User.findOne({ email: email });

  let checkPassword = await user.matchPassword(password);

  if (Boolean(user)) {
    // store the token to the cookie
    res.cookie("token", await createToken(user._id), {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
    });

    res.status(constants.SUCCESS).send({
      message: "success",
    });
  } else {
    throw new Error("User or password is not matched");
  }
});

module.exports = { registration, login };
