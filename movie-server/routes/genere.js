const express           = require('express');
const router            = express.Router();
const genereController  = require('../controller/Generecontroller.js');

//add genere
router.post('/add', genereController.create_genere);

/* GET genere listing. */
router.get('/', genereController.get_genere);

module.exports = router;
