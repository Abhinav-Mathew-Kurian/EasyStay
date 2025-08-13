import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import {profile} from '../controllers/user.controller'
const router = express.Router();

router.get('/profile/:id', authMiddleware, profile, (req, res) => {
  res.json({ message: 'This is a protected profile route', user: (req as any).user });
});

export default router;
