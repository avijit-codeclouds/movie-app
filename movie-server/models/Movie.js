const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  genre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Genere'
  },
  rating: {
    type: Number,
    default: 4,
  },
  year: {
    type: Number,
    required: true
  },
  rate: {
    type: Number,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
  trailerUrl: {
    type: String,
    default: null
  },
  description: {
    type: String,
    default: null
  }
},
{
    timestamps: true
});

module.exports = mongoose.model('Movie', movieSchema);
