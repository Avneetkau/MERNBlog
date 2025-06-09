import express from 'express';
import { createComment } from '../controllers/commentController.js';

import { verifyToken } from '../utils/verifyUser.js';

import { getPostComment} from '../controllers/commentController.js';

import { likeComment } from '../controllers/commentController.js';

import { editComment } from '../controllers/commentController.js';

import { deleteComment } from '../controllers/commentController.js';

import { getComments } from '../controllers/commentController.js';


const router=express.Router();

router.post('/create',verifyToken, createComment);
router.get('/getPostComment/:postId', getPostComment);

router.put('/likeComment/:commentId' , verifyToken, likeComment);

router.put('/editComment/:commentId' , verifyToken, editComment);

router.delete('/deleteComment/:commentId' , verifyToken, deleteComment);

router.get('/getcomments', verifyToken, getComments);

export default router;