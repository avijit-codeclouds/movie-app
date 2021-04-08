var express = require('express');
var router = express.Router();
const rentController = require('../controller/RentController');
var checkauth=require('../config/checkauth');

//rent movie
router.post('/movie/:movie_id',checkauth,rentController.rentMovie);


module.exports = router;
