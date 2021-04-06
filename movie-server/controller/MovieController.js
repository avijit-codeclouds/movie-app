require('dotenv').config();
const status = require('http-status');
const { data, cssNumber } = require('jquery');
const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );
const Movie = require('../models/Movie');
const bcrypt = require('bcrypt');
const { check, validationResult, body } = require('express-validator');

exports.validate = (method) => {
    switch (method) {
      case 'createUser': {
       return [ 
            body('name', 'Name is required').notEmpty(),
            body('email', 'Invalid email').exists().isEmail(),
            body('phone').optional().isInt(),
            body('status').optional().isIn(['enabled', 'disabled'])
         ]   
      }
    }
}

exports.createMovie = async(req,res,next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(200).json({ errors: errors.array() });
        }
        // const { title, genre, stock, rate } = req.body;
        // movie = new Movie({
        //     title,
        //     genre,
        //     stock,
        //     rate
        // });
        // await movie.save();
        // res.status(200).json({ success: true, result: 'successfully genre saved' })
        console.log(req.body)
        res.status(200).json({ success: true, result: req.body })
    } catch (err) {
        res.status(500).json({ success: false,result: err })
    }
}