const express           = require('express');
const router            = express.Router();
const rentController    = require('../controller/RentController');
const Validator         = require('../validator/movieValidate');
const checkObjectId     = require('../config/checkObjectId');

//rent movie
router.post('/movie',Validator.validate('wishList'),rentController.rentMovie);

router.get('/movie/list',rentController.rentList);


module.exports = router;
