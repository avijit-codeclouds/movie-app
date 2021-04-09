const express           = require('express');
const router            = express.Router();
const rentController    = require('../controller/RentController');
const Validator         = require('../validator/validate');
const checkObjectId     = require('../config/checkObjectId');

//rent movie

router.post('/movie',Validator.validate('wishList'),rentController.rentMovie);

router.delete('/',Validator.validate('wishList'),rentController.rentDelete);

router.get('/movies',rentController.rentList);

module.exports = router;
