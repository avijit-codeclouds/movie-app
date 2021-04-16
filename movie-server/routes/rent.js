const express           = require('express');
const router            = express.Router();
const rentController    = require('../controller/RentController');
const Validator         = require('../validator/validate');
const checkObjectId     = require('../config/checkObjectId');
const { handle_validation_error }  = require('../helper/helper');

//rent movie

router.post('/movie',Validator.validate('rentPanel'),handle_validation_error,rentController.rent_movie);

router.delete('/',Validator.validate('rentPanel'),handle_validation_error,rentController.rent_delete);

router.get('/movies',rentController.rent_list);

router.patch('/pause',Validator.validate('rentPanel'),handle_validation_error,rentController.pause_rent_movie)

router.post('/cancel',Validator.validate('rentPanel'),handle_validation_error,rentController.cancel_rent_movie)

router.get('/:user_id',rentController.user_movies)

module.exports = router;
