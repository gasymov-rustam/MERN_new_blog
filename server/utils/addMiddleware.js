import cors from 'cors';
import express from 'express';
import authRouter from '../routes/auth.js';
import postRoute from '../routes/posts.js';
import commentRoute from '../routes/comments.js';
import fileUpload from 'express-fileupload';

export const addMiddleware = (app) => {
  app.use(cors());
  app.use(fileUpload());
  app.use(express.json());
  app.use(express.static('uploads'));
  app.use('/api/auth', authRouter);
  app.use('/api/posts', postRoute);
  app.use('/api/comments', commentRoute);
};
