const express           = require('express');
const router            = express.Router();
const movieController   = require('../controller/MovieController');
const movieValidator    = require('../validator/validate');
const { handle_validation_error, admin_section }  = require('../helper/helper');

router
    .route('/')
    .get(movieController.movie_list)
    .post(movieValidator.validate('createMovie'),[ handle_validation_error , admin_section ],movieController.create_movie);

router
    .route('/:movie_id')
    .get(movieController.view_movie)
    .patch(movieValidator.validate('createMovie'),[ handle_validation_error , admin_section ],movieController.update_movie)
    .delete(admin_section, movieController.delete_movie);

router
    .route('/restore/:movie_id')
    .patch(admin_section, movieController.restore_movie);


module.exports = router;