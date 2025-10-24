import asyncHandler from 'express-async-handler';
import Idea from '../models/Idea.js';
import AIFeedback from '../models/AIFeedback.js';
import { generateIdeaFeedback, generateWeeklyTrends } from '../utils/ai.js';

const analyzeIdea = asyncHandler(async (req, res) => {
  const { ideaId, title, description } = req.body;

  const feedbackData = await generateIdeaFeedback({ title, description });

  let feedbackDoc = null;

  if (ideaId) {
    feedbackDoc = await AIFeedback.findOneAndUpdate(
      { ideaId },
      { ...feedbackData, generatedAt: new Date() },
      { new: true }
    );

    if (!feedbackDoc) {
      feedbackDoc = await AIFeedback.create({ ideaId, ...feedbackData });
      await Idea.findByIdAndUpdate(ideaId, { aiFeedback: feedbackDoc._id });
    }
  }

  res.json({
    feedback: feedbackDoc ? feedbackDoc.toObject() : feedbackData
  });
});

const getWeeklyTrends = asyncHandler(async (_req, res) => {
  const since = new Date();
  since.setDate(since.getDate() - 7);

  const ideas = await Idea.aggregate([
    { $match: { createdAt: { $gte: since } } },
    {
      $addFields: {
        avgRating: {
          $cond: [
            { $gt: ['$ratingCount', 0] },
            { $divide: ['$ratingSum', '$ratingCount'] },
            0
          ]
        }
      }
    },
    {
      $project: {
        title: 1,
        description: 1,
        forks: { $size: '$forks' },
        avgRating: 1
      }
    },
    { $sort: { avgRating: -1, forks: -1 } },
    { $limit: 10 }
  ]);

  const insights = await generateWeeklyTrends({ topIdeas: ideas });
  res.json(insights);
});

export { analyzeIdea, getWeeklyTrends };
