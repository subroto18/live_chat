const router = require("express").Router();
const {
  getAllUser,
  getUsersBySearch,
  userLoggedInDetails,
} = require("../../controllers/user.controller");
router.get("/all", getAllUser);

router.get("/search", getUsersBySearch);

router.get("/profile", userLoggedInDetails);

module.exports = router;
