var express = require('express');
var router = express.Router();
const rentController = require('../controller/RentController');
var checkauth=require('../config/checkauth');
const Validator = require('../validator/movieValidate')
const checkObjectId = require('../config/checkObjectId')

//rent movie
router.post('/movie',checkauth,Validator.validate('wishList'),rentController.rentMovie);

router.get('/movie/list',checkauth,rentController.rentList)


module.exports = router;
