import express from "express";
import { addComment, deleteComment } from "../controllers/commentController.js";

const commentRouter =  express.Router();

commentRouter.post("/add", addComment);
commentRouter.patch("/delete", deleteComment);

export default commentRouter;