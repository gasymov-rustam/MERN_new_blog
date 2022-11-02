import { Router } from 'express';
import { PostController } from '../controllers/Post.controller.js';
import { checkAuth } from '../utils/checkAuth.js';

const router = new Router();

router.post('/', checkAuth, PostController.createPost);

router.get('/', PostController.getAll);

router.get('/:id', PostController.getById);

router.put('/:id', checkAuth, PostController.updatePost);

router.get('/user/me', checkAuth, PostController.getMyPosts);

router.delete('/:id', checkAuth, PostController.removePost);

router.get('/comments/:id', PostController.getPostComments);

export default router;
