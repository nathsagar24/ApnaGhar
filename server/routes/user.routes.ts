import { Router } from 'express';
import { validateUser } from '../middleware/validation.middleware.js';
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile
} from '../controllers/user.controller.js';

const router = Router();

router.post('/register', validateUser, registerUser);
router.post('/login', loginUser);
router.get('/profile', getUserProfile);
router.put('/profile', validateUser, updateUserProfile);

export const userRoutes = router;