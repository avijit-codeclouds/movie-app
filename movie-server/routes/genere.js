var express = require('express');
var router = express.Router();
var generecontroller=require('../controller/Generecontroller.js');
var checkauth=require('../config/checkauth');
/* GET genere listing. */
// router.get('/', function(req, res, next) {
//   res.status(200).json({ result : 'user...' })
// });

//add genere
router.post('/add',checkauth,generecontroller.create_genere);





module.exports = router;
