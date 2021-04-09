const express               = require('express');
const router                = express.Router();
const customerController    = require('../controller/CustomerController.js');
const validator             = require('../validator/validate');

router
    .route('/')
    .get(customerController.get_all_customers)
    .post(validator.validate('customer') ,customerController.create_customer);

router
    .route('/:id')
    .get(customerController.get_customer)
    .patch(validator.validate('customer'), customerController.edit_customer)
    .delete(customerController.delete_customer);

module.exports = router;
