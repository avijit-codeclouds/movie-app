const express           = require('express');
const router            = express.Router();
const userController    = require('../controller/UserController');
const validator         = require('../validator/validate');
const checkauth         = require('../config/checkauth');

const { handle_validation_error } = require('../helper/helper');

//register
router.post('/register',validator.validate('register') , handle_validation_error ,userController.register_user);

//login
router.post('/login',validator.validate('login') , handle_validation_error ,userController.login_user);

//Me
router.get('/me', checkauth, userController.me);

module.exports = router;
