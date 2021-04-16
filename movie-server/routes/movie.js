const express           = require('express');
const router            = express.Router();
const movieController   = require('../controller/MovieController');
const movieValidator    = require('../validator/validate');
const { handle_validation_error }  = require('../helper/helper');

router
    .route('/')
    .get(movieController.movie_list)
    .post(movieValidator.validate('createMovie'),handle_validation_error,movieController.create_movie);

router
    .route('/:movie_id')
    .get(movieController.view_movie)
    .patch(movieValidator.validate('createMovie'),handle_validation_error,movieController.update_movie)
    .delete(movieController.delete_movie);


module.exports = router;