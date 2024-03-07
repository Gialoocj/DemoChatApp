const ChatGPTController = require("../controllers/chatGPT.controller");
const express = require("express");
const ChatGPTRouter = express.Router();

ChatGPTRouter.route("/:senderId/send-to-chat-gpt/").post(
  ChatGPTController.sendMessageToChatGPT
);

module.exports = ChatGPTRouter;
