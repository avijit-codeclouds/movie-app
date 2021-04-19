require('dotenv').config();

const createError   = require('http-errors');
const bodyParser    = require('body-parser');
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
const { expire_rent_movie }  = require('./jobs/Rentjob')




app.use(morgan('combined', { stream: winston.stream }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const option = {
  origin : "*",
  methods: "GET,PUT,PATCH,POST,DELETE",
  allowedHeaders : "Origin, X-Requested-With, Content-Type, Accept"
}
app.use(cors(option));
app.use(helmet());
app.use(cookieParser());
app.use(require('compression')())
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, 'public')));

cron.schedule('* * * * *', () => {
  expire_rent_movie()
});



app.use('/', routes);

// catch 404 and forward to error handler
app.use('*',(req, res, next) => {
  next(createError(404));
});


// error handler
app.use((err, req, res, next) => {
  // render the error page
  res.status(err.status || 500);
  res.json({
    error : {
      message : err.message
    }
  })
});

module.exports = app;

