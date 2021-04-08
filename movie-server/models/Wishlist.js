const mongoose = require('mongoose');

const WishlistSchema = new mongoose.Schema({
  user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
  },
  movie: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required:true
}],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Wishlist', WishlistSchema);