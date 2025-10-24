import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import validateInput from '../middleware/validateInput.js';
import { ratingValidator } from '../utils/validators.js';
import { rateIdea, getIdeaRating } from '../controllers/ratingController.js';

const router = express.Router();

router.post('/', protect, ratingValidator, validateInput, rateIdea);
router.get('/:ideaId', getIdeaRating);

export default router;
