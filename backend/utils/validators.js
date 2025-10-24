import { body } from 'express-validator';

export const registerValidator = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
];

export const loginValidator = [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password is required')
];

export const ideaCreateValidator = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('stage').optional().isIn(['concept', 'prototype', 'live']).withMessage('Invalid stage'),
  body('tags').optional().isArray().withMessage('Tags must be an array of strings'),
  body('websiteLinks')
    .optional()
    .isArray()
    .withMessage('Website links must be an array of strings')
];

export const ideaUpdateValidator = [
  body('title').optional().trim().notEmpty(),
  body('description').optional().trim().notEmpty(),
  body('stage').optional().isIn(['concept', 'prototype', 'live'])
];

export const forkValidator = [
  body('title').optional().trim().notEmpty(),
  body('description').optional().trim().notEmpty(),
  body('stage').optional().isIn(['concept', 'prototype', 'live'])
];

export const ratingValidator = [
  body('ideaId').notEmpty().withMessage('Idea ID required'),
  body('score').isInt({ min: 1, max: 5 }).withMessage('Score must be between 1 and 5')
];

export const commentValidator = [
  body('ideaId').notEmpty().withMessage('Idea ID required'),
  body('content').trim().notEmpty().withMessage('Content is required')
];

export const replyValidator = [
  body('content').trim().notEmpty().withMessage('Content is required')
];

export const aiAnalyzeValidator = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required')
];
