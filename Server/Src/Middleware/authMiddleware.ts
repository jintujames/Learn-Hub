import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import User from '../Models/studentModel';
import * as dotenv from 'dotenv';
import { Document } from 'mongoose';
dotenv.config();

interface CustomUser {
  _id: string;
  username: string;
  user: any | null;
}

declare global {
  namespace Express {
    interface Request {
      user?: CustomUser;
    }
  }
}

const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.headers.authorization?.split(' ')[1];
    const JWT_SECRET = process.env.JWT_SECRET as string;

    if (token) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

        const userId: string = decoded.user_id;

        const user: Document | null = await User.findById(userId).select(
          '-password'
        );

        if (user) {
          req.user = user as unknown as CustomUser;
          return next();
        } else {
          res.status(404).json({ error: 'User not found' });
        }
      } catch (error) {
        res.status(401).json({ error: 'Not authorized, invalid token' });
      }
    }

    // No token provided
    res.status(403).json({ error: 'No token provided' });
  }
);

export { protect };
