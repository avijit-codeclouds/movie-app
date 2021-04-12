require('dotenv').config();
const status = require('http-status');
const Movie = require('../models/Movie');
const Rent = require('../models/Rent')
const moment = require('moment');
const { response } = require('../helper/helper');
const APIFeatuers   = require('../utils/apiFeatures');


exports.cancelRentMovie = async(req,res,next) => {
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

exports.pauseRentMovie = async(req,res,next) => {
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

exports.rentMovie = async(req,res,next) => {
    try {
        const { user, movie } = req.body;
        let getMovie = await Movie.findById(movie)
        if(!getMovie){
            return res.status(status.OK).json(response(false,'','invalid movie'))
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

exports.rentDelete = async(req,res,next) => {
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

exports.rentList = async(req,res,next) => {
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
