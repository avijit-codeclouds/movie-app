const express           = require('express');
const router            = express.Router();
const movieController   = require('../controller/MovieController');
const movieValidator    = require('../validator/movieValidate');
const wishlistController = require ('../controller/WishlistController');



router.post('/',movieValidator.validate('wishList'),wishlistController.wishList);

module.exports=router;