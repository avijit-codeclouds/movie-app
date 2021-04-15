require('dotenv').config();

const createError   = require('http-errors');
const bodyParser    =  require('body-parser');
const passport      = require('passport');

const express       = require('express');
const path          = require('path');
const cookieParser  = require('cookie-parser');
const morgan        = require('morgan');
const winston       = require('./config/winston');
const cors          = require('cors');
const helmet        = require('helmet');
const routes        = require('./routes');
const app           = express();
const cron = require('node-cron')
const { expire_rent_movie } = require('./controller/RentController')




app.use(morgan('combined', { stream: winston.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.disable('x-powered-by');
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// cron.schedule('* * * * * *', () => {
//   console.log('running a task every minute');
//   // expire_rent_movie()
// });

app.use('/', routes);

module.exports = app;

