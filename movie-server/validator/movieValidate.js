const {
   check,
   validationResult,
   body
} = require('express-validator');

exports.validate = (method) => {
   switch (method) {
      case 'createMovie': {
         return [
            body('title', 'Title is required').notEmpty(),
            body('genre', 'Genre is required').notEmpty(),
            body('stock', 'Stock is required').notEmpty(),
            body('rate', 'Rate is required').notEmpty(),
         ]
      }
      case 'wishList': {
         return [
            body('user', 'User is required').notEmpty(),
            body('movie', 'Movie is required').notEmpty(),
         ]
      }
   }
}