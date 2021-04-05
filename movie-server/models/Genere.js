const mongoose = require('mongoose');

const GenereSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true,
},
  // avatar: {
  //   type: String
  // },
  // token:{
  //   type: String
  // },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Genere', GenereSchema);
