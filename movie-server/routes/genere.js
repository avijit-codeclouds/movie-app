const express           = require('express');
const router            = express.Router();
const genereController  = require('../controller/Generecontroller.js');
const validator         = require('../validator/validate');

router
    .route('/')
    .get(genereController.get_all_genere)
    .post(validator.validate('genere') ,genereController.create_genere);

module.exports = router;
