const { constants } = require("../utils/constants");
const User = require("../models/user.model");
var jwt = require("jsonwebtoken");
const tough = require("tough-cookie");
const Cookie = tough.Cookie;

const auth = async (req, res, next) => {
  var token = req.headers?.cookie?.split("=")?.[1];

  if (token) {
    var decode = jwt.verify(token, process.env.JWT_SECRET);

    if (decode.uuid) {
      let user = await User.findOne({ _id: decode.uuid }).select([
        "_id",
        "name",
        "email",
        "avatar",
      ]);
      req.user = user;
      next();
    } else {
      res.status(constants.UNAUTHORIZED);
      res.send({
        message: "Unauthorized User",
      });
    }
  } else {
    res.status(constants.UNAUTHORIZED);
    res.send({
      message: "Unauthorized User",
    });
  }
};
module.exports = auth;
