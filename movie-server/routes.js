const express       = require('express');
const indexRouter   = require('./routes/index');
const usersRouter   = require('./routes/users');
const genereRouter  = require('./routes/genere');
const customerRoute = require('./routes/customers');
const movieRoute    = require('./routes/movie');
const rentRoute     = require('./routes/rent');
var checkauth       = require('./config/checkauth');
const router        = express.Router();


/* Default Routes */
module.exports = router.use('/', indexRouter);

/* User Routes */
module.exports = router.use('/api/v1/users' ,usersRouter);

/*Generes Routes */
module.exports = router.use('/api/v1/generes', genereRouter);

/*Movie Routes */
module.exports = router.use('/api/v1/movie', checkauth, movieRoute);

/*Rent Routes */
module.exports = router.use('/api/v1/rent', rentRoute);

/*Customer Routes */
module.exports = router.use('/api/v1/rent', customerRoute);