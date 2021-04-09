const express       = require('express');
const indexRouter   = require('./routes/index');
const usersRouter   = require('./routes/users');
const genereRouter  = require('./routes/genere');
const customerRoute = require('./routes/customers');
const movieRoute    = require('./routes/movie');
const rentRoute     = require('./routes/rent');
const checkauth     = require('./config/checkauth');
const router        = express.Router();


/* Default Routes */
module.exports = router.use('/', indexRouter);

/* User Routes */
module.exports = router.use('/api/v1/users', usersRouter);

/*Generes Routes */
module.exports = router.use('/api/v1/generes',checkauth ,genereRouter);

/*Movie Routes */
module.exports = router.use('/api/v1/movie',checkauth , movieRoute);

/*Rent Routes */
module.exports = router.use('/api/v1/rent',checkauth ,rentRoute);

/*Customer Routes */
module.exports = router.use('/api/v1/customer',checkauth ,customerRoute);