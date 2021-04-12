const express           = require('express');
const router            = express.Router();
const rentController    = require('../controller/RentController');
const Validator         = require('../validator/validate');
const checkObjectId     = require('../config/checkObjectId');
const { handle_validation_error }  = require('../helper/helper');

//rent movie

router.post('/movie',Validator.validate('rentPanel'),handle_validation_error,rentController.rentMovie);

router.delete('/',Validator.validate('rentPanel'),handle_validation_error,rentController.rentDelete);

router.get('/movies',rentController.rentList);

router.patch('/pause',Validator.validate('rentPanel'),handle_validation_error,rentController.pauseRentMovie)

router.post('/cancel',Validator.validate('rentPanel'),handle_validation_error,rentController.cancelRentMovie)

module.exports = router;
