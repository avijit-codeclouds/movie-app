require('dotenv').config();
const status = require('http-status');
const { data, cssNumber } = require('jquery');
const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );
const Movie = require('../models/Movie');
const bcrypt = require('bcrypt');
const { check, validationResult, body } = require('express-validator');

exports.createMovie = async(req,res,next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(status.OK).json({ errors: errors.array() });
        }
        const { title, genre, stock, rate } = req.body;
        movie = new Movie({
            title,
            genre,
            stock,
            rate
        });
        await movie.save();
        return res.status(status.OK).json({ success: true, result: 'successfully movie saved' })
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({ success: false, result: err })
    }
}

exports.getSingleMovie = async(req,res,next) => {
    try {
        let movie = await Movie.findById(req.params.movie_id)
        if(!movie){
            return res.status(status.NOT_FOUND).json({ success : false, msg : 'invalid movie' })
        }
        return res.status(status.OK).json({ success: true, result: movie })
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({ success: false, result: err })
    }
}

exports.updateMovie = async(req,res,next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(status.OK).json({ errors: errors.array() });
        }
        const { title, genre, stock, rate } = req.body;

        let movie = await Movie.findById(req.params.movie_id)
        if(!movie){
            return res.status(status.NOT_FOUND).json({ success : false, msg : 'invalid movie' })
        }
        const payload = {
            title,
            genre,
            stock,
            rate
        }
        await Movie.findByIdAndUpdate(req.params.movie_id, payload);
        return res.status(status.OK).json({ success: true, msg: 'movie updated' })
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({ success: false, result: err })
    }
}

exports.movieList = async(req,res,next) => {
    try {
        let movie = await Movie.find().populate('genre')
        return res.status(status.OK).json({ success: true, msg: 'movie list', result: movie })
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({ success: false, result: err })
    }
}