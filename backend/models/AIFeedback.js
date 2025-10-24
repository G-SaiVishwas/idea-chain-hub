import mongoose from 'mongoose';

const aiFeedbackSchema = new mongoose.Schema(
  {
    ideaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Idea',
      required: true,
      unique: true
    },
    viabilityScore: {
      type: Number,
      min: 0,
      max: 100,
      required: true
    },
    creativityScore: {
      type: Number,
      min: 0,
      max: 100,
      required: true
    },
    marketFitScore: {
      type: Number,
      min: 0,
      max: 100,
      required: true
    },
    summary: {
      type: String,
      required: true
    },
    suggestions: {
      type: [String],
      default: []
    },
    generatedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

const AIFeedback = mongoose.model('AIFeedback', aiFeedbackSchema);

export default AIFeedback;
