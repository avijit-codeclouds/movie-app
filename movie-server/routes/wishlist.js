const express               = require('express');
const router                = express.Router();
const validator             = require('../validator/validate');
const wishlistController    = require ('../controller/WishlistController');
const helper                = require('../helper/helper');

router
    .route('/')
    .get(wishlistController.get_wishlist)
    .post(validator.validate('wishList'), helper.handle_validation_error ,wishlistController.create_wishlist);

module.exports=router;
