import express from "express";
import { createConversation, getConversations, getOneConversation } from "../controllers/conversation.controller.js";

const conversationRouter = express.Router();

conversationRouter.get("/conversation/:conversationId", getOneConversation);
conversationRouter.get("/:userId", getConversations);
conversationRouter.post("/", createConversation);
export default conversationRouter;