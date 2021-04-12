const mongoose = require('mongoose');

const WishlistSchema = new mongoose.Schema({
  user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
  },
  movies: [
    {
       type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required:true
      },
  ],
  // movies: [
  //   {
  //     movie: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: 'Movie',
  //       required:true
  //     },
  //     // isChecked: {
  //     //   type:String,
  //     //   required:true
  //     // }
  //   }
  // ],
// isChecked: {
//   type:String,
//   enum:['false','true'],
//   default:'true'
// },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Wishlist', WishlistSchema);