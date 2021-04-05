var express = require('express');
var router = express.Router();
var usercontroller=require('../controller/UserController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.status(200).json({ result : 'user...' })
});

router.post('/register',usercontroller.register_user);




module.exports = router;
