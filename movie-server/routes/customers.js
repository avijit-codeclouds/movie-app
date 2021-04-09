const express               = require('express');
const router                = express.Router();
const customerController    = require('../controller/CustomerController.js');

/* GET customer listing. */
router.get('/', customerController.get_customers);

module.exports = router;
