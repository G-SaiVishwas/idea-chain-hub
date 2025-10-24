import asyncHandler from 'express-async-handler';
import Rating from '../models/Rating.js';
import Idea from '../models/Idea.js';

const rateIdea = asyncHandler(async (req, res) => {
  const { ideaId, score } = req.body;

  const idea = await Idea.findById(ideaId);
  if (!idea) {
    res.status(404);
    throw new Error('Idea not found');
  }

  const existingRating = await Rating.findOne({ ideaId, userId: req.user._id });

  if (existingRating) {
    idea.ratingSum -= existingRating.score;
    existingRating.score = score;
    await existingRating.save();
  } else {
    await Rating.create({ ideaId, userId: req.user._id, score });
    idea.ratingCount += 1;
  }

  idea.ratingSum += score;
  await idea.save();

  res.status(200).json({
    average: idea.ratingCount ? idea.ratingSum / idea.ratingCount : 0,
    count: idea.ratingCount
  });
});

const getIdeaRating = asyncHandler(async (req, res) => {
  const idea = await Idea.findById(req.params.ideaId);

  if (!idea) {
    res.status(404);
    throw new Error('Idea not found');
  }

  res.json({
    average: idea.ratingCount ? idea.ratingSum / idea.ratingCount : 0,
    count: idea.ratingCount
  });
});

export { rateIdea, getIdeaRating };
