const Rent = require('../models/Rent');
const moment = require('moment');

exports.modifyExpire = async () => {
    try {
        let now = moment().format("YYYY-MM-DD[T]HH:mm");
        Rent.find()
            .then(results => {
                results.forEach(async (resu) => {
                    movieRentals = resu.movies;
                    for (let movieRental of movieRentals) {
                        endDay = moment(movieRental.expireAt).format("YYYY-MM-DD[T]HH:mm");
                        if (now > endDay) {
                            isExpire = movieRental.expired;
                            movieId = movieRental._id
                            if (!isExpire) {
                                await resu.fixExpired(movieId);
                            }
                        }
                    }
                });
            })
            .catch(err => {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            });
    } catch (err) {
        console.log(err);
    };
}