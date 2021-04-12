const express           = require('express');
const router            = express.Router();
const rentController    = require('../controller/RentController');
const Validator         = require('../validator/validate');
const checkObjectId     = require('../config/checkObjectId');
const { handleValidationError }  = require('../helper/helper');

//rent movie

router.post('/movie',Validator.validate('rentPanel'),handleValidationError,rentController.rentMovie);

router.delete('/',Validator.validate('rentPanel'),handleValidationError,rentController.rentDelete);

router.get('/movies',rentController.rentList);

router.patch('/pause',Validator.validate('rentPanel'),handleValidationError,rentController.pauseRentMovie)

router.post('/cancel',Validator.validate('rentPanel'),handleValidationError,rentController.cancelRentMovie)

module.exports = router;
