import express from "express";
import { createConversation, getConversations } from "../controllers/conversation.controller.js";

const conversationRouter = express.Router();

conversationRouter.get("/:userId", getConversations);
conversationRouter.post("/", createConversation);
export default conversationRouter;