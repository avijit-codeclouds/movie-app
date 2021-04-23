const express           = require('express');
const router            = express.Router();
const genereController  = require('../controller/Generecontroller.js');
const validator         = require('../validator/validate');
const { handle_validation_error, admin_section } = require('../helper/helper');

router
    .route('/')
    .get(genereController.get_all_genere)
    .post(validator.validate('genere') , [ handle_validation_error, admin_section ], genereController.create_genere);

module.exports = router;
