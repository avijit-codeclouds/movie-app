const express           = require('express');
const router            = express.Router();
const rentController    = require('../controller/RentController');
const Validator         = require('../validator/validate');
const checkObjectId     = require('../config/checkObjectId');

//rent movie

router.post('/movie',Validator.validate('rentPanel'),rentController.rentMovie);

router.delete('/',Validator.validate('rentPanel'),rentController.rentDelete);

router.get('/movies',rentController.rentList);

router.patch('/pause',Validator.validate('rentPanel'),rentController.pauseRentMovie)

router.post('/cancel',Validator.validate('rentPanel'),rentController.cancelRentMovie)

module.exports = router;
