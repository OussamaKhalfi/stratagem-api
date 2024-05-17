import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';

dotenv.config();
connectDB();

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);

app.use('/api/tasks', taskRoutes);

const PORT: number = parseInt(process.env.PORT!) || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
