require('dotenv').config();
const status = require('http-status');
const Movie = require('../models/Movie');
const { response } = require('../helper/helper');
const APIFeatuers   = require('../utils/apiFeatures');

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
        const msg = 'Movie Successfully saved'
        return res.status(status.OK).json(response(true,newMovie,msg));
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json(response(false,err))
    }
}

exports.getSingleMovie = async (req, res, next) => {
    try {
        let movie = await Movie.findById(req.params.movie_id)
        const invalidMsg = 'invalid movie'
        if (!movie) {
            return res.status(status.NOT_FOUND).json(response(false,movie,invalidMsg))
        }
        const msg = 'here is your movie'
        return res.status(status.OK).json(response(true,movie,msg))
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json(response(false,err))
    }
}

exports.updateMovie = async (req, res, next) => {
    try {
        const {
            title,
            genre,
            stock,
            rate
        } = req.body;

        let movie = await Movie.findById(req.params.movie_id)
        if (!movie) {
            const invalidMsg = 'invalid movie'
            return res.status(status.NOT_FOUND).json(response(false,movie,invalidMsg))
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
        const msg = 'movie updated'
        return res.status(status.OK).json(response(true,updateMovie,msg))
    } catch (err) {
        console.log(err)
        return res.status(status.INTERNAL_SERVER_ERROR).json(response(false,err))
    }
}

exports.movieList = async (req, res, next) => {
    try {
        // let movie = await Movie.find().populate('genre')
        const msg = 'movie list'
        const features = new APIFeatuers(Movie.find().populate('genre'), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();

        const movie = await features.query;
        return res.status(status.OK).json(response(true,movie,msg))
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json(response(false,err))
    }
}

exports.deleteMovie = async (req, res, next) => {
    try {
        let movie = await Movie.findById(req.params.movie_id)
        if (!movie) {
            const invalidMsg = 'invalid movie'
            return res.status(status.NOT_FOUND).json(response(false,movie,invalidMsg))
        }
        const getMovie = await Movie.findByIdAndDelete(req.params.movie_id)
        const msg = 'movie deleted'
        return res.status(status.OK).json(response(true,msg))
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json(response(false,err))
    }
}
