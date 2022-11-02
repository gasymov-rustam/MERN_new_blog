import express from 'express';
import { startUp } from './utils/startUp.js';
// import dotenv from 'dotenv';
// dotenv.config();

const app = express();

startUp(app);
