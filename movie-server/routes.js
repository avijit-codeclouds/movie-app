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

/**
 * Routes with JWT required:
 */

const verifiedRoute = router.use(checkauth);

/*Generes Routes */
module.exports = verifiedRoute.use(ROUTE_PREFIX+'/generes', genereRouter);

/*Movie Routes */
module.exports = verifiedRoute.use(ROUTE_PREFIX+'/movie', movieRoute);

/*Wishlist Routes */
module.exports = verifiedRoute.use(ROUTE_PREFIX+'/wishlist', wishlistRoute);

/*Rent Routes */
module.exports = verifiedRoute.use(ROUTE_PREFIX+'/rent', rentRoute);

/*Customer Routes */
module.exports = verifiedRoute.use(ROUTE_PREFIX+'/customer' ,customerRoute);

