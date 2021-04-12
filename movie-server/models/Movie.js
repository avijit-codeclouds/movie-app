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
  stock: {
    type: String,
    required: true,
  },
  rate: {
    type: String,
    required: true,
  }
},
{
    timestamps: true
});

module.exports = mongoose.model('Movie', movieSchema);
