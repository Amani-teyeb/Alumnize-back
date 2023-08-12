const express = require("express");
const { allMessages, sendMessage } = require("../controllers/message");
const { requireSignin } = require("../common-middleware");

const router = express.Router();

router.get("/message/:chatId", requireSignin, allMessages);
router.post("/message", requireSignin, sendMessage);

module.exports = router;
