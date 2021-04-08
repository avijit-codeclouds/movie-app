require('dotenv').config();
const status = require('http-status');
const { data, cssNumber } = require('jquery');
const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );
const Movie = require('../models/Movie');
const Rent = require('../models/Rent')
const bcrypt = require('bcrypt');
const { check, validationResult, body } = require('express-validator');
const moment = require('moment')

exports.rentMovie = async(req,res,next) => {
    try {
        let getMovie = await Movie.findById(req.params.movie_id)
        if(!getMovie){
            return res.status(status.NOT_FOUND).json({ success : false, msg : 'invalid movie' })
        }
        const { user, movie } = req.body;
        const current_time = moment().format('hh:mm A')//add date with the time
        const travelTime = moment().add(2, 'hours').format('hh:mm A');//add date with the time
        
        const rent = await Rent.findOne({ user: user })
        const payload = {
            movie, startday: current_time, endday: travelTime
        }
        if(!rent){
            rent = new Rent({
                user: user,
                movies : payload,
                endday: travelTime
            });
            // user.password = await bcrypt.hash(password, salt);
            const newRent = await rent.save();
            return res.status(status.OK).json({ success: true, result: 'successfully rent saved',result: newRent })
        }else{
            rent.movies.unshift(payload)
            const movieList = await rent.save();
            return res.status(status.OK).json({ success: true, result: 'successfully rent saved',result: movieList })
        }
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({ success: false, result: err })
    }
}