const Rent = require('../models/Rent')
const moment = require('moment');

exports.expire_rent_movie = async() => {
    try {
        const rent = await Rent.find(
            { "movies.expireAt": moment().format("YYYY-MM-DD[T]HH:mm") },
        );
        // console.log(rent)
        let users = []
        rent.forEach(async(e) => {
            users.push(e.user)
            const updateRentlist = await Rent.findOne({ user: e.user })
            const movies = e.movies
            movies.forEach(async(el) => {
                console.log(`movie id :: ${el.movie}`)
                const anyMovieExists = updateRentlist.movies.filter(e => e.movie.toString() === el.movie.toString());
                console.log(anyMovieExists.length)
                if(anyMovieExists.length > 0){
                    try {
                        const newPayload = anyMovieExists[0]
                        newPayload.expired = true
                        updateRentlist.movies = updateRentlist.movies.filter(e => e.movie.toString() !== el.movie.toString());
                        updateRentlist.movies.unshift(newPayload)
                        await updateRentlist.save();   
                    } catch (err) {
                        console.log(err)
                    }
                }
            })
        })
        console.log('rent list updated...')
    } catch (err) {
        console.log(err)
    }
}