const express           = require('express');
const router            = express.Router();
const rentController    = require('../controller/RentController');
const Validator         = require('../validator/validate');
const { handle_validation_error, admin_section }  = require('../helper/helper');


/**
 * Rent Routes
 */

//list rent
router.get('/', admin_section ,rentController.rent_list);

//rent movie
router.post('/',Validator.validate('rentPanel'),handle_validation_error,rentController.rent_movie);

//delete a rent
router.patch('/delete',Validator.validate('rentPanel'),handle_validation_error,rentController.rent_delete);

//handle rent actions
router.patch('/action',Validator.validate('rentPatch'),handle_validation_error,rentController.handle_rent_action);

//View user rents
router.get('/:user_id',rentController.view_rent);

module.exports = router;
