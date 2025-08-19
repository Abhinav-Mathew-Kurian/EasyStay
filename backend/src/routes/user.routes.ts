import express from 'express';
import multer from 'multer';
import { authMiddleware } from '../middlewares/auth.middleware';
import {
  getProfile,
  updateProfile,
  uploadProfileImage,
  addToSavedListing,
  removeFromSavedListing
} from '../controllers/user.controller';

const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1]);
  }
});

const upload = multer({ 
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Profile routes
router.get('/profile/:id', authMiddleware, getProfile);
router.put('/profile/:id', authMiddleware, updateProfile);

router.put("/save/:id", addToSavedListing);
router.delete("/save/:id", removeFromSavedListing);
// Image upload routes
router.post('/profile/:id/image', authMiddleware, upload.single('profileImage'), uploadProfileImage);


export default router;