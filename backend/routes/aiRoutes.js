import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import validateInput from '../middleware/validateInput.js';
import { aiAnalyzeValidator } from '../utils/validators.js';
import { analyzeIdea, getWeeklyTrends } from '../controllers/aiController.js';

const router = express.Router();

router.post('/analyze', protect, aiAnalyzeValidator, validateInput, analyzeIdea);
router.get('/trends', getWeeklyTrends);

export default router;
