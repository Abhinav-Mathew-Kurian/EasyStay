import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/profile', authMiddleware, (req, res) => {
  res.json({ message: 'This is a protected profile route', user: (req as any).user });
});

export default router;
