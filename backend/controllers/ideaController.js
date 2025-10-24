import asyncHandler from 'express-async-handler';
import Idea from '../models/Idea.js';
import AIFeedback from '../models/AIFeedback.js';
import User from '../models/User.js';
import { generateIdeaFeedback } from '../utils/ai.js';

const populateIdea = () => [
  { path: 'createdBy', select: 'name avatar role' },
  { path: 'parentIdea', select: 'title createdBy ratingCount ratingSum' },
  { path: 'forks', select: 'title createdBy ratingCount ratingSum' },
  { path: 'aiFeedback' }
];

const createIdea = asyncHandler(async (req, res) => {
  const { title, description, tags = [], stage = 'concept', parentIdea, websiteLinks = [], image = '' } = req.body;

  const idea = await Idea.create({
    title,
    description,
    tags,
    stage,
    parentIdea: parentIdea || null,
    websiteLinks,
    image,
    createdBy: req.user._id
  });

  await User.findByIdAndUpdate(req.user._id, {
    $addToSet: { ideasContributed: idea._id }
  });

  if (parentIdea) {
    await Idea.findByIdAndUpdate(parentIdea, { $addToSet: { forks: idea._id } });
  }

  const aiFeedbackData = await generateIdeaFeedback({ title, description });
  const feedbackDoc = await AIFeedback.create({ ideaId: idea._id, ...aiFeedbackData });
  idea.aiFeedback = feedbackDoc._id;
  await idea.save();

  const populated = await Idea.findById(idea._id).populate(populateIdea());

  res.status(201).json(populated);
});

const getIdeas = asyncHandler(async (req, res) => {
  const { page = 1, limit = 12, sort = 'latest', tags, stage, search, createdBy } = req.query;

  const filters = {};
  if (tags) filters.tags = { $in: tags.split(',') };
  if (stage) filters.stage = stage;
  if (search) filters.title = { $regex: search, $options: 'i' };
  if (createdBy) filters.createdBy = createdBy;

  const pageNumber = Number(page);
  const pageLimit = Number(limit);

  const sortOptions = {
    latest: { createdAt: -1 },
    oldest: { createdAt: 1 },
    topRated: { ratingSum: -1 },
    trending: { ratingCount: -1 }
  };

  const ideas = await Idea.find(filters)
    .sort(sortOptions[sort] || sortOptions.latest)
    .skip((pageNumber - 1) * pageLimit)
    .limit(pageLimit)
    .populate(populateIdea());

  const count = await Idea.countDocuments(filters);

  res.json({
    data: ideas,
    pagination: {
      total: count,
      page: pageNumber,
      limit: pageLimit,
      pages: Math.ceil(count / pageLimit)
    }
  });
});

const getIdeaById = asyncHandler(async (req, res) => {
  const idea = await Idea.findById(req.params.id).populate([
    ...populateIdea(),
    {
      path: 'forks',
      populate: { path: 'createdBy', select: 'name avatar role' }
    }
  ]);

  if (!idea) {
    res.status(404);
    throw new Error('Idea not found');
  }

  res.json(idea);
});

const updateIdea = asyncHandler(async (req, res) => {
  const idea = await Idea.findById(req.params.id);

  if (!idea) {
    res.status(404);
    throw new Error('Idea not found');
  }

  if (idea.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Forbidden');
  }

  const updatable = ['title', 'description', 'tags', 'stage', 'websiteLinks', 'image'];
  updatable.forEach((field) => {
    if (req.body[field] !== undefined) {
      idea[field] = req.body[field];
    }
  });

  const updated = await idea.save();
  const populated = await Idea.findById(updated._id).populate(populateIdea());
  res.json(populated);
});

const deleteIdea = asyncHandler(async (req, res) => {
  const idea = await Idea.findById(req.params.id);

  if (!idea) {
    res.status(404);
    throw new Error('Idea not found');
  }

  if (idea.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Forbidden');
  }

  await Idea.deleteOne({ _id: idea._id });
  await AIFeedback.deleteOne({ ideaId: idea._id });
  await User.updateMany({}, { $pull: { ideasContributed: idea._id } });

  if (idea.parentIdea) {
    await Idea.findByIdAndUpdate(idea.parentIdea, { $pull: { forks: idea._id } });
  }

  res.status(204).send();
});

export { createIdea, getIdeas, getIdeaById, updateIdea, deleteIdea };
