const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  movieID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true
  },
  review: {
    type: String,
    required: true
  },
  isAnonymous: {
    type: Boolean,
    required: false
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  deletedAt: {
    type: Date,
    default: null,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema);