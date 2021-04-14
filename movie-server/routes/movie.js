const express           = require('express');
const router            = express.Router();
const movieController   = require('../controller/MovieController');
const movieValidator    = require('../validator/validate');
const { handle_validation_error }  = require('../helper/helper');

router.post('/add', movieValidator.validate('createMovie'),handle_validation_error,movieController.create_movie);

router.post('/edit/:movie_id',movieValidator.validate('createMovie'),handle_validation_error,movieController.update_movie);

router.get('/list',movieController.movie_list);

router.post('/delete/:movie_id',movieController.delete_movie);

router.get('/:movie_id',movieController.view_movie);


module.exports = router;