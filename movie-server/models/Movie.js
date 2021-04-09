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
  },
  isChecked: {
  type:String,
  enum:['false','true'],
  default:'false'
},
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Movie', movieSchema);
