import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import validateInput from '../middleware/validateInput.js';
import { ideaCreateValidator, ideaUpdateValidator, forkValidator } from '../utils/validators.js';
import { createIdea, getIdeas, getIdeaById, updateIdea, deleteIdea } from '../controllers/ideaController.js';
import { forkIdea } from '../controllers/forkController.js';

const router = express.Router();

router.route('/').post(protect, ideaCreateValidator, validateInput, createIdea).get(getIdeas);
router.route('/:id').get(getIdeaById).patch(protect, ideaUpdateValidator, validateInput, updateIdea).delete(protect, deleteIdea);
router.post('/:id/fork', protect, forkValidator, validateInput, forkIdea);

export default router;
