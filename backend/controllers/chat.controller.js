const asyncHandler = require("express-async-handler");
const data = require("../data/chatData");
const Chat = require("../models/chat.model");
const User = require("../models/user.model");
const { constants } = require("../utils/constants");
const { use } = require("../routes/v1");

const getAllChats = asyncHandler(async (req, res) => {
  const chat = await Chat.find({
    users: { $elemMatch: { $eq: req.user._id } },
  })
    .populate("users", "-password")
    .populate("groupAdmin", "-password")
    .populate("latestMessage");

  chat = await User.populate(chat, {
    path: "latestMessage.sender",
    select: "name avatar email",
  });

  res.send(chat);
});

const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("userId param not sent with request");
    return res.sendStatus(400);
  }

  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name avatar email",
  });

  if (Array.isArray(isChat) && isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    const createData = await Chat.create({
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    });

    try {
      const createChat = await Chat.create(createData);
      const fullChat = await Chat.findOne({ _id: createChat.id }).populate(
        "users",
        "-password"
      );
      res.status(constants.SUCCESS).send(fullChat);
    } catch (error) {
      res
        .status(constants.SERVER_ERROR)
        .send("Something went wrong in creating chat");
    }
  }
});

const createGroup = asyncHandler(async (req, res) => {
  let { users, groupName } = req.body;

  console.log(users, groupName);

  if (!(users && groupName)) {
    res.status(400).send({
      message: "All field required",
    });
  }

  users = JSON.parse(users);

  if (users.length >= 2) {
    const createChat = await Chat.create({
      chatName: groupName,
      isGroupChat: true,
      users: users,
    });
    if (createChat) {
      createChat.populate("users", "-password");
      res.send(createChat);
    } else {
      res.status(500).send({
        message: "Something went wrong",
      });
    }
  } else {
    res.status(400).send({
      message: "Minimum two user required",
    });
  }
});

const renameGroup = asyncHandler(async (req, res) => {
  let { chatId, chatName } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    { chatName },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    res.status(constants.NOT_FOUND);
    throw new Error("Chat Not Found");
  } else {
    res.send(updatedChat);
  }
});

const addToGroup = asyncHandler(async (req, res) => {
  let { chatId, userId } = req.body;

  const updatedGroup = await Chat.findByIdAndUpdate(
    chatId,
    { $push: { users: userId } },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedGroup) {
    res.status(constants.NOT_FOUND);
    throw new Error("Chat Not Found");
  } else {
    res.send(updatedGroup);
  }
});

const removeToGroup = asyncHandler(async (req, res) => {
  let { chatId, userId } = req.body;

  const updatedGroup = await Chat.findByIdAndUpdate(
    chatId,
    { $pull: { users: userId } },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedGroup) {
    res.status(constants.NOT_FOUND);
    throw new Error("Chat Not Found");
  } else {
    res.send(updatedGroup);
  }
});

module.exports = {
  getAllChats,
  accessChat,
  createGroup,
  renameGroup,
  addToGroup,
  removeToGroup,
};
