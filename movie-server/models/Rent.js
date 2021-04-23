const mongoose = require('mongoose');
const moment = require('moment');
console.log(moment().format("YYYY-MM-DD[T]HH:mm"))
console.log(moment().add(5, 'minutes').format("YYYY-MM-DD[T]HH:mm"))

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
      // default: moment().add(48, 'hours').format("YYYY-MM-DD[T]HH:mm")
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