import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import generateToken from '../config/jwt';

export const register = async (req: Request, res: Response) => {
	try {
		const { username, password } = req.body;
		const newUser = new User({ username, password });
		await newUser.save();
		const token = generateToken(newUser._id);
		res.status(201).json({ token });
	} catch (error) {
		res.status(500).json({ message: 'Registration failed' });
	}
};

export const login = async (req: Request, res: Response) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });
		if (!user) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}
		const token: string = generateToken(user._id);
		res.status(200).json({ token });
	} catch (error) {
		res.status(500).json({ message: 'Login failed' });
	}
};
