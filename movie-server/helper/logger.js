const winston = require('winston');
const appRoot = require('app-root-path');

const logger = exports.logger =  winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    defaultMeta: { service: 'Movie-App Server' },
    transports: [
        new winston.transports.File({ filename: `${appRoot}/logs/info.log`, level: 'info' }),
        new winston.transports.File({ filename: `${appRoot}/logs/error.log`, level: 'error' })
    ],
});