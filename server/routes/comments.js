import { Router } from 'express';
import { CommentController } from '../controllers/Comments.controller.js';
const router = new Router();
import { checkAuth } from '../utils/checkAuth.js';

// Create Comment
// http://localhost:3002/api/comments/:id
router.post('/:id', checkAuth, CommentController.createComment);

export default router;
