const router = require("express").Router();
const {
  getAllChats,
  accessChat,
  createGroup,
} = require("../../controllers/chat.controller");
router.get("/", getAllChats);
router.post("/", accessChat);
router.post("/group", createGroup);

module.exports = router;
