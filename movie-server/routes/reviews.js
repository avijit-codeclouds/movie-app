const express               = require('express');
const router                = express.Router();
const validator             = require('../validator/validate');
const reviewController    = require ('../controller/ReviewController');
const helper                = require('../helper/helper');

router
    .route('/:movieID')
    .get(reviewController.view_review)
    .post(validator.validate('review'), helper.handle_validation_error, reviewController.add_review);

module.exports=router;
