const express = require("express");
const router = express();
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
  getChatById,
} = require("../controllers/chat");
const { requireSignin } = require("../common-middleware");

router.post("/chat", requireSignin, accessChat);
router.get("/chat", requireSignin, fetchChats);
router.post("/chat/group", requireSignin, createGroupChat);
router.get("/chat/:chatId", requireSignin, getChatById);
router.put("/chat/rename", requireSignin, renameGroup);
router.put("/chat/groupadd", requireSignin, addToGroup);
router.put("/chat/groupremove", requireSignin, removeFromGroup);

module.exports = router;
