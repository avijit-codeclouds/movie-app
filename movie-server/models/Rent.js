const mongoose = require('mongoose');

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
            required:true
        },
        endday: {
            type: String,
            required:true
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
        }
      },
      {
          timestamps: true
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
