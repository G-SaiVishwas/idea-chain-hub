import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import validateInput from '../middleware/validateInput.js';
import { commentValidator, replyValidator } from '../utils/validators.js';
import { addComment, getComments, replyToComment } from '../controllers/commentController.js';

const router = express.Router();

router.post('/', protect, commentValidator, validateInput, addComment);
router.get('/:ideaId', getComments);
router.post('/:id/reply', protect, replyValidator, validateInput, replyToComment);

export default router;
