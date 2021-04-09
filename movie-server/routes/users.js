const express           = require('express');
const router            = express.Router();
const userController    = require('../controller/UserController');

/* GET users listing. */
router.get('/', function(req, res) {
  res.status(200).json({ result : 'user...' });
});

//register
router.post('/register',userController.register_user);

//login
router.post('/login',userController.login_user);

module.exports = router;
