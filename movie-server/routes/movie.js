var express = require('express');
var router = express.Router();
var checkauth=require('../config/checkauth');
const movieController = require('../controller/MovieController')
const movieValidator = require('../validator/movieValidate')


router.post('/add', movieValidator.validate('createMovie'),movieController.createMovie);

router.post('/edit/:movie_id',checkauth,movieValidator.validate('createMovie'),movieController.updateMovie);

router.get('/list',movieController.movieList);

router.get('/delete/:movie_id',checkauth,movieController.deleteMovie)

router.get('/:movie_id',checkauth,movieController.getSingleMovie);

router.post('/wishlist',movieValidator.validate('wishList'),movieController.wishList);

module.exports = router;