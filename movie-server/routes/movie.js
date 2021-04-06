var express = require('express');
var router = express.Router();
var checkauth=require('../config/checkauth');
const movieController = require('../controller/MovieController')
const movieValidator = require('../validator/movieValidate')


router.post('/add',checkauth,movieValidator.validate('createMovie'),movieController.createMovie);

router.post('/edit/:movie_id',checkauth,movieValidator.validate('createMovie'),movieController.updateMovie);

router.get('/list',checkauth,movieController.movieList);

router.get('/:movie_id',checkauth,movieController.getSingleMovie);


module.exports = router;