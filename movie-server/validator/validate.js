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
            body('year', 'Year is required').notEmpty(),
            body('rate', 'Rate is required').notEmpty(),
         ];
      }
      case 'wishList': {
         return [
            body('movies', 'Movie is required').notEmpty(),
         ];
      }
      case 'rentPanel': {
         return [
            body('user', 'User is required').notEmpty(),
            body('movie', 'Movie is required').notEmpty(),
         ];
      }
      case 'rentPatch': {
         return [
            body('user', 'User is required').notEmpty(),
            body('movie', 'Movie is required').notEmpty(),
            body('action', 'Action is required').notEmpty(),
            body('action_value', 'Action value is required').notEmpty(),
         ];
      }
      case 'customer': {
         return [
            body('name', 'Name is required').notEmpty(),
            body('details', 'Details is required').notEmpty(),
         ];
      }
      case 'genere': {
         return [
            body('name', 'Name is required').notEmpty(),
            body('details', 'Details is required').notEmpty(),
         ];
      }
      case 'register': {
         return [
            body('name', 'Name is required').notEmpty(),
            body('email', 'Email is required').notEmpty(),
            body('email', 'Valid email is required.').isEmail(),
            body('password', 'Password is required').notEmpty(),
         ];
      }
      case 'login': {
         return [
            body('email', 'Email is required').notEmpty(),
            body('email', 'Valid email is required.').isEmail(),
            body('password', 'Password is required').notEmpty(),
         ];
      }
      case 'review': {
         return [
            body('review', 'Review is required').notEmpty()
         ];
      }
   }
};