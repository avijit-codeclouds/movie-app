const mongoose = require('mongoose');

const RentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  movies: [{
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie',
      required: true
    },
    startday: {
      type: String,
      required: true,
    },
    endday: {
      type: String,
      required: true,
    },
    expired: {
      type: Boolean,
      default: false
    },
    paused: {
      type: Boolean,
      default: false
    },
    canceled: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: String,
      required: true,
    },
    expireAt: {
      type: String,
      index: true,
      required: true,
    },
    available: {
      type: Boolean,
      default: true
    }
  }],
  isLocked: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Rent', RentSchema);