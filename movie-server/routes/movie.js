const express           = require('express');
const router            = express.Router();
const movieController   = require('../controller/MovieController');
const movieValidator    = require('../validator/validate');

router.post('/add', movieValidator.validate('createMovie'),movieController.createMovie);

router.post('/edit/:movie_id',movieValidator.validate('createMovie'),movieController.updateMovie);

router.get('/list',movieController.movieList);

router.delete('/delete/:movie_id',movieController.deleteMovie);

router.get('/:movie_id',movieController.getSingleMovie);


module.exports = router;