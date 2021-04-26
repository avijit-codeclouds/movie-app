const Rent       = require('../models/Rent');
const moment     = require('moment');
const { logger } = require('../helper/logger');

exports.expiry_scheduler = async () => {
    try
    {
        const now = moment().utc().format("YYYY-MM-DD[T]HH:mm");

        await Rent.updateMany({"movies.expireAt": {$lt:now }},{"movies.$[el].expired": true},{
            arrayFilters: [{
                "el.expireAt": {$lt:now }
                }]
        });

    } catch (err) {
        logger.error(err);
    }
};