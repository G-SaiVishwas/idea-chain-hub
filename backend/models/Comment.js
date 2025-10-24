import mongoose from 'mongoose';

const replySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: {
      type: String,
      required: true,
      trim: true
    }
  },
  { timestamps: true }
);

const commentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    ideaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Idea',
      required: true
    },
    content: {
      type: String,
      required: true,
      trim: true
    },
    replies: {
      type: [replySchema],
      default: []
    }
  },
  { timestamps: true }
);

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
