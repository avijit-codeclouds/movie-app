const mongoose = require('mongoose');

const GenereSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true
      },
      details: {
        type: String,
        required: true,
      },
    },
    {
        timestamps: true
    }
  );

module.exports = mongoose.model('Genere', GenereSchema);
