const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");
var jwt = require("jsonwebtoken");
const { constants } = require("../utils/constants");

const getAllUser = asyncHandler(async (req, res) => {
  let user = await User.find({});
  res.send(user);
});

// search?name="subroto"

const getUsersBySearch = asyncHandler(async (req, res) => {
  let keyword = req.query.search
    ? {
        $or: [{ name: req.query.search }, { email: req.query.search }],
      }
    : {};

  const users = await User.find(keyword)
    .find({
      _id: { $ne: req.user._id },
    })
    .select("-password");
  res.send(users);
});

const userLoggedInDetails = asyncHandler(async (req, res) => {
  res.send(req.user);
});

const createToken = asyncHandler(async (uuid) => {
  const payload = { uuid };
  const options = { expiresIn: "1h" };
  const token = jwt.sign(payload, process.env.JWT_SECRET, options);
  return token;
});

module.exports = {
  getAllUser,
  createToken,
  getUsersBySearch,
  userLoggedInDetails,
};
