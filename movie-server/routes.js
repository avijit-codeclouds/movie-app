const express       = require('express');
const indexRouter   = require('./routes/index');
const usersRouter   = require('./routes/users');
const genereRouter  = require('./routes/genere');
const customerRoute = require('./routes/customers');
const movieRoute    = require('./routes/movie');
const wishlistRoute = require('./routes/wishlist');
const rentRoute     = require('./routes/rent');
const checkauth     = require('./config/checkauth');
const router        = express.Router();
const constants     = require('./constant');
const ROUTE_PREFIX  = constants.ROUTE_PREFIX + constants.ROUTE_VERSION;

/* Default Routes */
module.exports = router.use('/', indexRouter);

/* User Routes */
module.exports = router.use(ROUTE_PREFIX+'/users', usersRouter);

/*Generes Routes */
module.exports = router.use(ROUTE_PREFIX+'/generes' ,genereRouter);

/*Movie Routes */
module.exports = router.use(ROUTE_PREFIX+'/movie',checkauth , movieRoute);

/*Wishlist Routes */
module.exports = router.use(ROUTE_PREFIX+'/wishlist',checkauth ,wishlistRoute);

/*Rent Routes */
module.exports = router.use(ROUTE_PREFIX+'/rent',checkauth ,rentRoute);

/*Customer Routes */
module.exports = router.use(ROUTE_PREFIX+'/customer' ,customerRoute);
