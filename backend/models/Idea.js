import mongoose from 'mongoose';

const ideaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    tags: {
      type: [String],
      default: []
    },
    image: {
      type: String,
      default: ''
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    parentIdea: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Idea',
      default: null
    },
    forks: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Idea'
    }],
    aiFeedback: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AIFeedback'
    },
    stage: {
      type: String,
      enum: ['concept', 'prototype', 'live'],
      default: 'concept'
    },
    websiteLinks: {
      type: [String],
      default: []
    },
    ratingCount: {
      type: Number,
      default: 0
    },
    ratingSum: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

const Idea = mongoose.model('Idea', ideaSchema);

export default Idea;
