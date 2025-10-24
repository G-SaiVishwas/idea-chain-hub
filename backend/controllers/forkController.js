import asyncHandler from 'express-async-handler';
import Idea from '../models/Idea.js';
import { createIdea } from './ideaController.js';

const forkIdea = asyncHandler(async (req, res) => {
  const parentIdea = await Idea.findById(req.params.id);

  if (!parentIdea) {
    res.status(404);
    throw new Error('Parent idea not found');
  }

  const { title, description, tags = parentIdea.tags } = req.body;

  req.body.parentIdea = parentIdea._id;
  req.body.title = title || `${parentIdea.title} (Fork)`;
  req.body.description = description || parentIdea.description;
  req.body.tags = tags;
  req.body.stage = req.body.stage || 'concept';
  req.body.websiteLinks = req.body.websiteLinks || [];

  return createIdea(req, res);
});

export { forkIdea };
