const mongoose = require('mongoose');
const moment = require('moment');

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
      default: moment().format('MMMM Do YYYY, hh:mm A')
    },
    endday: {
      type: String,
      required: true,
      default: moment().add(48, 'hours').format('MMMM Do YYYY, hh:mm A')
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
      default: moment().format("YYYY-MM-DD[T]HH:mm")
    },
    expireAt: {
      type: String,
      index: true,
      default: moment().add(48, 'hours').format("YYYY-MM-DD[T]HH:mm")
    }
  }],
  isLocked: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

RentSchema.methods.fixExpired = async function (rentId) {
  const RentMovieIndex = this.movies.findIndex(cp => {
    return cp._id.toString() === rentId.toString();
  });
  if (RentMovieIndex >= 0) {
    this.movies[RentMovieIndex].expired = true;
  }
  return new Promise((resolve, reject) => {
    resolve(this.save());
  });
};

module.exports = mongoose.model('Rent', RentSchema);