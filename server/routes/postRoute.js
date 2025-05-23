import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';

import {   createPost } from '../controllers/postController.js';
import { getPosts } from "../controllers/postController.js";
import { deletePost } from '../controllers/postController.js';
import { updatePost } from '../controllers/postController.js';

const router = express.Router();

router.post("/create-post", verifyToken,createPost);
router.get("/getposts",getPosts);
router.delete("/deletepost/:postId/:userId",verifyToken,deletePost);
router.put("/updatepost/:postId/:userId",verifyToken,updatePost);

export  default router;
