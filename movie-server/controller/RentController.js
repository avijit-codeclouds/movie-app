require('dotenv').config();
const status = require('http-status');
const Movie = require('../models/Movie');
const Rent = require('../models/Rent')
const moment = require('moment');
const { response } = require('../helper/helper');
const APIFeatuers   = require('../utils/apiFeatures');

exports.user_movies = async(req,res,next) => {
    try {
        const user = req.params.user_id
        const getUser = await Rent.findOne({ user: user }).populate('movies.movie')
        if(!getUser){
            return res.status(status.OK).json(response(false,'','no one movie is found with this user'))
        }
        return res.status(status.OK).json(response(true,getUser,'listed movies with this user'))
    } catch (err) {
        console.log(err)
        return res.status(status.INTERNAL_SERVER_ERROR).json(response(false,err))
    }
}

exports.cancel_rent_movie = async(req,res,next) => {
    try {
        const { user, movie } = req.body;
        
        const getUser = await Rent.findOne({ user: user })
        if(!getUser){
            return res.status(status.OK).json(response(false,'','no one movie is found with this user'))
        }
        const updateRentlist = await Rent.findById(getUser._id)
        const anyMovieExists = updateRentlist.movies.filter(e => e.movie.toString() === movie);
        if(anyMovieExists.length <= 0){
            return res.status(status.OK).json(response(false,'','invalid movie'))
        }else{
            const newPayload = anyMovieExists[0]
            newPayload.canceled = true
            updateRentlist.movies = updateRentlist.movies.filter(e => e.movie.toString() !== movie);
            updateRentlist.movies.unshift(newPayload)
            await updateRentlist.save();
            return res.status(status.OK).json(response(true,updateRentlist,'rent canceled' ))
        }
    } catch (err) {
        console.log(err)
        return res.status(status.INTERNAL_SERVER_ERROR).json(response(false,err))
    }
}

exports.pause_rent_movie = async(req,res,next) => {
    try {
        const { user, movie } = req.body;
        
        const getUser = await Rent.findOne({ user: user })
        if(!getUser){
            return res.status(status.OK).json(response(false,'','no one movie is found with this user'))
        }
        const updateRentlist = await Rent.findById(getUser._id)
        const anyMovieExists = updateRentlist.movies.filter(e => e.movie.toString() === movie);
        if(anyMovieExists.length <= 0){
            return res.status(status.OK).json(response(false,'','invalid movie'))
        }else{
            const newPayload = anyMovieExists[0]
            newPayload.paused = true
            updateRentlist.movies = updateRentlist.movies.filter(e => e.movie.toString() !== movie);
            updateRentlist.movies.unshift(newPayload)
            await updateRentlist.save();
            return res.status(status.OK).json(response(true,updateRentlist,'rent paused' ))
        }
    } catch (err) {
        console.log(err)
        return res.status(status.INTERNAL_SERVER_ERROR).json(response(false,err))
    }
}

exports.rent_movie = async(req,res,next) => {
    try {
        const { user, movie } = req.body;
        let getMovie = await Movie.findById(movie)
        if(!getMovie){
            return res.status(status.OK).json(response(false,'','invalid movie'))
        }

        
        console.log(moment().add(48, 'hours').toDate())

        const getUser = await Rent.findOne({ user: user })
        const payload = {
            movie
        }
        if(!getUser){
            rent = new Rent({
                user: user,
                movies : payload
            });
            const newRent = await rent.save();
            return res.status(status.OK).json(response(true,newRent,'successfully rent saved'))
        }else{
            // console.log(getUser.movies)
            if (getUser.movies.some((movies) => movies.movie.toString() === movie )) {
                return res.status(status.OK).json(response(false,'','movie already on rent'))
            }else{
                getUser.movies.unshift(payload)
                const movieList = await getUser.save();
                return res.status(status.OK).json(response(true,movieList,'successfully rent saved'))
            }
        }
    } catch (err) {
        console.log(err)
        return res.status(status.INTERNAL_SERVER_ERROR).json(response(false,err))
    }
}

exports.rent_delete = async(req,res,next) => {
    try {
        const { user, movie } = req.body;
        
        const getUser = await Rent.findOne({ user: user })
        
        if(!getUser){
            return res.status(status.OK).json(response(false,'','no one movie is found with this user'))
        }
        const updateRentlist = await Rent.findById(getUser._id)
        const anyMovieExists = updateRentlist.movies.filter(e => e.movie.toString() === movie);
        if(anyMovieExists.length <= 0){
            return res.status(status.OK).json(response(false,'','invalid movie'))
        }else{
            updateRentlist.movies = updateRentlist.movies.filter(e => e.movie.toString() !== movie);
            await updateRentlist.save();
            return res.status(status.OK).json(response(true,updateRentlist,'rent list updated'))
        }
    } catch (err) {
        console.log(err)
        return res.status(status.INTERNAL_SERVER_ERROR).json(response(false,err))
    }
}

exports.rent_list = async(req,res,next) => {
    try {
        // const rent = await Rent.find().populate(['movies.movie']).
        // populate({ path: 'user', select: '-password' })

        const features = new APIFeatuers(Rent.find().populate(['movies.movie']).
        populate({ path: 'user', select: '-password' }), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();

        const rent = await features.query;
        return res.status(status.OK).json(response(true,rent,'rented movie list'))
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json(response(false,err))
    }
}
