import express, { Request, Response } from 'express';
import authMiddleware from '../middleware/authMiddleware';
import { getAllTasks } from '../controllers/taskController';

const router = express.Router();

router.get('/', authMiddleware, getAllTasks);

export default router;
