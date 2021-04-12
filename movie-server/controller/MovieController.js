require('dotenv').config();
const status = require('http-status');
const Movie = require('../models/Movie');
const Wishlist = require('../models/Wishlist');

exports.createMovie = async (req, res) => {
    try {
        const {
            title,
            genre,
            stock,
            rate
        } = req.body;
        movie = new Movie({
            title,
            genre,
            stock,
            rate
        });
        const newMovie = await movie.save();
        return res.status(status.OK).json({
            success: true,
            msg: 'Movie Successfully saved'
        });
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            success: false,
            result: err
        });
    }
}

exports.getSingleMovie = async (req, res, next) => {
    try {
        let movie = await Movie.findById(req.params.movie_id)
        if (!movie) {
            return res.status(status.NOT_FOUND).json({
                success: false,
                msg: 'invalid movie'
            })
        }
        return res.status(status.OK).json({
            success: true,
            result: movie
        })
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            success: false,
            result: err
        })
    }
}

exports.updateMovie = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(status.OK).json({
                errors: errors.array()
            });
        }
        const {
            title,
            genre,
            stock,
            rate
        } = req.body;

        let movie = await Movie.findById(req.params.movie_id)
        if (!movie) {
            return res.status(status.NOT_FOUND).json({
                success: false,
                msg: 'invalid movie'
            })
        }
        const payload = {
            title,
            genre,
            stock,
            rate
        }
        const updateMovie = await Movie.findByIdAndUpdate(req.params.movie_id, payload, {
            new: true
        });
        return res.status(status.OK).json({
            success: true,
            msg: 'movie updated',
            result: updateMovie
        })
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            success: false,
            result: err
        })
    }
}

exports.movieList = async (req, res, next) => {
    try {
        let movie = await Movie.find().populate('genre')
        return res.status(status.OK).json({
            success: true,
            msg: 'movie list',
            result: movie
        })
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            success: false,
            result: err
        })
    }
}

exports.deleteMovie = async (req, res, next) => {
    try {
        let movie = await Movie.findById(req.params.movie_id)
        if (!movie) {
            return res.status(status.NOT_FOUND).json({
                success: false,
                msg: 'invalid movie'
            })
        }
        await Movie.findByIdAndDelete(req.params.movie_id)
        return res.status(status.OK).json({
            success: true,
            msg: 'movie deleted'
        })
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            success: false,
            result: err
        })
    }
}
