const express               = require('express');
const router                = express.Router();
const customerController    = require('../controller/CustomerController.js');
const validator             = require('../validator/validate');
const helper                = require('../helper/helper');

router
    .route('/')
    .get(customerController.get_all_customers)
    .post(validator.validate('customer') , helper.handle_validation_error ,customerController.create_customer);

router
    .route('/:id')
    .get(customerController.get_customer)
    .patch(validator.validate('customer'), helper.handle_validation_error ,customerController.edit_customer)
    .delete(customerController.delete_customer);

router
    .route('/lock/:id')
    .patch(customerController.handle_customer_lock);


module.exports = router;
