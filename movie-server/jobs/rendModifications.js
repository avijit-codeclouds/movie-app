const Rent      = require('../models/Rent');
const moment    = require('moment');
const { logger } = require('../helper/logger');

exports.modifyExpire = async () => {
    try {
        const now = moment().format("YYYY-MM-DD[T]HH:mm");
        let update = await Rent.updateMany({"movies.expireAt": {$lt:now }},{"movies.$[el].expired": true},{
            arrayFilters: [{
                "el.expireAt": {$lt:now }
                }]
        })
    } catch (err) {
        logger.error(err);
    }
};