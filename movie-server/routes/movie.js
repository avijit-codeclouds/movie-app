var express = require('express');
var router = express.Router();
var checkauth=require('../config/checkauth');
const movieController = require('../controller/MovieController')


router.post('/add',checkauth,movieController.validate('createUser'),movieController.createMovie);

module.exports = router;