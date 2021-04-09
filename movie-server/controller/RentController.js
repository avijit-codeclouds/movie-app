require('dotenv').config();
const status = require('http-status');
const { data, cssNumber } = require('jquery');
const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );
const Movie = require('../models/Movie');
const Rent = require('../models/Rent')
const User = require('../models/User')
const bcrypt = require('bcrypt');
const { check, validationResult, body } = require('express-validator');
const moment = require('moment');

exports.rentDelete = async(req,res,next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(status.OK).json({ errors: errors.array() });
        }
        const { user, movie } = req.body;
        
        const getUser = await Rent.findOne({ user: user })
        
        if(!getUser){
            return res.status(status.OK).json({ success : false, msg : 'no one movie is found with this user' })
        }
        const updateRentlist = await Rent.findById(getUser._id)
        const anyMovieExists = updateRentlist.movies.filter(e => e.movie.toString() === movie);
        if(anyMovieExists.length <= 0){
            return res.status(status.OK).json({ success : false, msg : 'invalid movie' })
        }else{
            updateRentlist.movies = updateRentlist.movies.filter(e => e.movie.toString() !== movie);
            await updateRentlist.save();
            return res.status(status.OK).json({ success: true, result: updateRentlist, msg: 'rent list updated' })
        }
    } catch (err) {
        console.log(err)
        return res.status(status.INTERNAL_SERVER_ERROR).json({ success: false, result: err })
    }
}

exports.rentList = async(req,res,next) => {
    try {
        const rent = await Rent.find().populate(['movies.movie']).
        populate({ path: 'user', select: '-password' })
        return res.status(status.OK).json({ success: true, msg: 'rented movie list', result: rent })
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({ success: false, result: err })
    }
}

exports.rentMovie = async(req,res,next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(status.OK).json({ errors: errors.array() });
        }
        const { user, movie } = req.body;
        let getMovie = await Movie.findById(movie)
        if(!getMovie){
            return res.status(status.OK).json({ success : false, msg : 'invalid movie' })
        }

        const currentTime = moment().format('MMMM Do YYYY, hh:mm A')
        const expireTime = moment().add(48, 'hours').format('MMMM Do YYYY, hh:mm A');
        
        const getUser = await Rent.findOne({ user: user })
        const payload = {
            movie, startday: currentTime, endday: expireTime
        }
        if(!getUser){
            rent = new Rent({
                user: user,
                movies : payload
            });
            // user.password = await bcrypt.hash(password, salt);
            const newRent = await rent.save();
            return res.status(status.OK).json({ success: true, result: 'successfully rent saved',result: newRent })
        }else{
            // console.log(getUser.movies)
            if (getUser.movies.some((movies) => movies.movie.toString() === movie )) {
                return res.status(status.OK).json({ success: false, result: 'movie already on rent' });
            }else{
                getUser.movies.unshift(payload)
                const movieList = await getUser.save();
                return res.status(status.OK).json({ success: true, result: 'successfully rent saved',result: movieList })
            }
        }
    } catch (err) {
        console.log(err)
        return res.status(status.INTERNAL_SERVER_ERROR).json({ success: false, result: err })
    }
}