require('dotenv').config();

const bodyParser    = require('body-parser');
const passport      = require('passport');

const express       = require('express');
const path          = require('path');
const cookieParser  = require('cookie-parser');
const morgan        = require('morgan');
const winston       = require('./config/winston');
const helmet        = require('helmet');
const routes        = require('./routes');
const app           = express();
const globalErrorHandler = require('./helper/errorHandler');

app.use(morgan('combined', { stream: winston.stream }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('cors')());
app.use(helmet());
app.use(cookieParser());
app.use(require('compression')());
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, 'public')));

app.use( (req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use('/', routes);

// catch 404 and forward to error handler
app.use('*', globalErrorHandler.handle_404);

// error handler
app.use(globalErrorHandler.generic_errors);

module.exports = app;

