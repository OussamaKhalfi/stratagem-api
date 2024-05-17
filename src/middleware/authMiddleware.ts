import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

const authMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const token: string = req.headers.authorization!.split(' ')[1];
		const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
		const user: IUser | null = await User.findById(decoded.userId);
		if (!user) {
			throw new Error();
		}
		(req as any).user = user;
		next();
	} catch (error) {
		res.status(401).json({ message: 'Unauthorized' });
	}
};

export default authMiddleware;
