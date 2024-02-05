import express from "express";
import {addPost, getAll,  deletePost, likePost } from "../controllers/postController.js";
import cloudinarysave from "../middlewares/multercloudinary.js"

const postRouter =  express.Router();

postRouter.post('/add', cloudinarysave.single("image"), addPost);
postRouter.get('/get/all', getAll);
postRouter.delete('/delete/:postId', deletePost);
postRouter.put('/like', likePost);

export default postRouter;