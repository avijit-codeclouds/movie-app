const express           = require('express');
const router            = express.Router();
const movieController   = require('../controller/MovieController');
const validator    = require('../validator/validate');
const wishlistController = require ('../controller/WishlistController');



router.post('/',validator.validate('wishList'),wishlistController.create_wishlist);
router.get('/get/:_id',wishlistController.get_wishlist);

module.exports=router;