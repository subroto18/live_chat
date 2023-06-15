const router = require("express").Router();
const userRouter = require("./user.route");
const chatRouter = require("./chat.route");
const authRouter = require("./auth.route");
const auth = require("../../middlewares/auth.middleware");
router.use("/auth", authRouter);
router.use("/user", auth, userRouter);
router.use("/chat", auth, chatRouter);
module.exports = router;
