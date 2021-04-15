const mongoose = require('mongoose');
const moment = require('moment');

const RentSchema = new mongoose.Schema({
    user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required:true
    },
    movies: [
      {
        movie: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Movie',
          required:true
        },
        startday: {
            type: String,
            required:true,
            default : moment().format('MMMM Do YYYY, hh:mm A')
        },
        endday: {
            type: String,
            required:true,
            default : moment().add(48, 'hours').format('MMMM Do YYYY, hh:mm A')
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
        createdAt: { type: String, default: moment().format("YYYY-MM-DD[T]HH:mm") },
        expireAt: { type: String, index: true, default: moment().add(48, 'hours').format("YYYY-MM-DD[T]HH:mm") }
        // expireAt: { type: Date, default: moment().add(48, 'hours').toDate() }
      }
    ],
    // date: {
    //   type: Date,
    //   default: Date.now
    // }
  },
  {
      timestamps: true
  });

module.exports = mongoose.model('Rent', RentSchema);
