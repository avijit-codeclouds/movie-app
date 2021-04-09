const express = require('express');
const router = express.Router();
const customercontroller=require('../controller/CustomerController.js');
const checkauth=require('../config/checkauth');

// /* GET genere listing. */
router.get('/',checkauth, customercontroller.get_customers);




module.exports = router;
