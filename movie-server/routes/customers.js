const express               = require('express');
const router                = express.Router();
const customerController    = require('../controller/CustomerController.js');

router
    .route('/')
    .get(customerController.get_all_customers);

router
    .route('/:id')
    .get(customerController.get_customer)
    .delete(customerController.delete_customer);

router
    .route('/lock/:id')
    .patch(customerController.handle_customer_lock);


module.exports = router;
