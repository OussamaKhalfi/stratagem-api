import { Request, Response } from 'express';
import Task from '../models/Task';
import { ITask } from '../models/Task';

export const getAllTasks = async (req: Request, res: Response) => {
	try {
		const tasks: ITask[] = await Task.find({ user: (req as any).user._id });
		res.status(200).json(tasks);
	} catch (error) {
		res.status(500).json({ message: 'Failed to fetch tasks' });
	}
};

export const createTask = async (req: Request, res: Response) => {
	const task = new Task({
		...req.body,
		user: (req as any).user._id,
	});
	try {
		await task.save();
		res.status(201).json(task);
	} catch (error) {
		res.status(400).json({ message: 'Failed to create task' });
	}
};

export const updateTask = async (req: Request, res: Response) => {
	const { id } = req.params;
	const task = await Task.findOne({ _id: id, user: (req as any).user._id });
	if (!task) {
		return res.status(404).json({ message: 'Task not found' });
	}
	try {
		await Task.updateOne({ _id: id }, req.body);
		res.status(200).json({ message: 'Task updated successfully' });
	} catch (error) {
		res.status(400).json({ message: 'Failed to update task' });
	}
};

export const deleteTask = async (req: Request, res: Response) => {
	const { id } = req.params;
	const task = await Task.findOne({ _id: id, user: (req as any).user._id });
	if (!task) {
		return res.status(404).json({ message: 'Task not found' });
	}
	try {
		await Task.deleteOne({ _id: id });
		res.status(200).json({ message: 'Task deleted successfully' });
	} catch (error) {
		res.status(400).json({ message: 'Failed to delete task' });
	}
};
