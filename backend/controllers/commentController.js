import asyncHandler from 'express-async-handler';
import Comment from '../models/Comment.js';

const addComment = asyncHandler(async (req, res) => {
  const { ideaId, content } = req.body;

  const comment = await Comment.create({
    ideaId,
    content,
    userId: req.user._id
  });

  res.status(201).json(await comment.populate('userId', 'name avatar'));
});

const getComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find({ ideaId: req.params.ideaId })
    .sort({ createdAt: -1 })
    .populate('userId', 'name avatar')
    .populate('replies.userId', 'name avatar');

  res.json(comments);
});

const replyToComment = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    res.status(404);
    throw new Error('Comment not found');
  }

  comment.replies.unshift({
    content,
    userId: req.user._id
  });

  await comment.save();

  await comment.populate('replies.userId', 'name avatar');

  res.status(201).json(comment);
});

export { addComment, getComments, replyToComment };
