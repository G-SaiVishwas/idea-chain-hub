import express from 'express';
import { registerUser, loginUser, getProfile } from '../controllers/userController.js';
import { registerValidator, loginValidator } from '../utils/validators.js';
import validateInput from '../middleware/validateInput.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerValidator, validateInput, registerUser);
router.post('/login', loginValidator, validateInput, loginUser);
router.get('/profile', protect, getProfile);

export default router;
