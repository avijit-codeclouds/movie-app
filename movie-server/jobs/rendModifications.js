const Rent      = require('../models/Rent');
const moment    = require('moment');
const { logger } = require('../helper/logger');

exports.modifyExpire = async () => {
    try {
        const now = moment().format("YYYY-MM-DD[T]HH:mm");

        let rents = await Rent.find();

        rents.forEach( async (results) =>
        {
            movieRentals = results.movies;
            for (let movieRental of movieRentals)
            {
                endDay = moment(movieRental.expireAt).format("YYYY-MM-DD[T]HH:mm");

                if (now > endDay)
                {
                    isExpire = movieRental.expired;
                    movieId = movieRental._id;

                    if (!isExpire)
                    {
                        await results.fixExpired(movieId);
                    }
                }
            }
        });

    } catch (err) {
        logger.error(err);
    }
};