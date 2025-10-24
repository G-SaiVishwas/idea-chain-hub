import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema(
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
    score: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    }
  },
  { timestamps: true }
);

ratingSchema.index({ userId: 1, ideaId: 1 }, { unique: true });

const Rating = mongoose.model('Rating', ratingSchema);

export default Rating;
