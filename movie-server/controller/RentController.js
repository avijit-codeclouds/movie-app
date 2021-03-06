require('dotenv').config();
const status        = require('http-status');
const Movie         = require('../models/Movie');
const Rent          = require('../models/Rent');
const APIFeatuers   = require('../utils/apiFeatures');
const { response, first, error_response } = require('../helper/helper');
const moment = require('moment');

exports.view_rent = async( req,res ) => {
    try
    {
        const user = req.params.user_id;
        const getUser = await Rent.findOne({ user: user }).populate('movies.movie');

        if(!getUser)
        {
            return res.status(status.OK).json(response(false,'','no one movie is found with this user'));
        }

        return res.status(status.OK).json(response(true,getUser,'listed movies with this user'));

    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json( error_response(err) );
    }
};

exports.rent_movie = async( req,res ) => {
    try
    {
        const { user, movie } = req.body;
        let getMovie = await Movie.findById(movie);

        if(!getMovie || getMovie.isDeleted === true)
            return res.status(status.OK).json(response(false, null, 'Movie is not available'));

        const getUser = await Rent.findOne({ user });

        const payload = generate_rent_payload( movie );

        if(!getUser)
        {
            rent = new Rent({
                user,
                movies : payload
            });
            const newRent = await rent.save();
            return res.status(status.OK).json(response(true, newRent, 'Rent successfully saved'));
        }

        //Return if movie is locked
        if(getUser.isLocked === true)
            return res.status(status.OK).json(response(false, null, 'Your account is locked, Please contact Administrator'));

        const movieContent = getUser.movies.find(e => e.movie.toString() === movie.toString());

        //Return if movie is already on rent, This movie is expired / canceled
        if(movieContent != undefined && !(movieContent.expired === true || movieContent.canceled === true))
            return res.status(status.OK).json(response(false, null, 'Movie already on rent'));

        getUser.movies = getUser.movies.filter(movies => movies.movie.toString() !== movie.toString());
        getUser.movies.unshift(payload);

        movieList = await getUser.save();

        return res.status(status.OK).json(response(true, movieList, 'Rent saved successfully'));

    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json(error_response(err));
    }
};

exports.rent_delete = async ( req, res ) => {
    try {
        const { user, movie } = req.body;

        const getUser = await Rent.findOne({ user });

        if(!getUser)
        {
            return res.status(status.OK).json(response(false, null,'No rented movie found with this user'));
        }

        const updateRentlist = await Rent.findById(getUser._id);
        const anyMovieExists = updateRentlist.movies.filter(e => e.movie.toString() === movie);
        if(anyMovieExists.length < 1)
        {
            return res.status(status.OK).json(response(false, null ,'Movie is not available'));
        }

        updateRentlist.movies = updateRentlist.movies.filter(e => e.movie.toString() !== movie);
        await updateRentlist.save();
        return res.status(status.OK).json(response(true,updateRentlist,'Rent List updated'));

    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json(error_response(err));
    }
}

exports.rent_list = async( req, res ) => {
    try {

        const features = new APIFeatuers(Rent.find().populate(['movies.movie']).populate({ path: 'user', select: '-password' }), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();

        const rent = await features.query;
        return res.status(status.OK).json(response(true,rent));

    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json(error_response(err));
    }
};

exports.handle_rent_action = async( req, res ) => {
    try
    {
        const action         = req.body.action;
        const actionValue    = req.body.action_value;

        const allowedActions = ["canceled", "paused"];

        if( allowedActions.includes(action))
        {
            return handle_action(req, res, action, actionValue);
        }

        return res.status(status.FORBIDDEN).json(response(false, null, "Invalid Action!"));

    } catch(err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json(error_response(err));
    }
};

handle_action = async( req, res, action, action_value ) => {

    try {
        const { user, movie } = req.body;

        const getUser = await Rent.findOne({ user });

        if(!getUser)
            return res.status(status.OK).json(response(false, null, 'No Rented Movie found with this user!'));

        const updateRentlist = await Rent.findById(getUser._id);
        const anyMovieExists = updateRentlist.movies.filter(e => e.movie.toString() === movie);

        if(anyMovieExists.length < 1)
            return res.status(status.OK).json(response(false, null, 'Movie is not available'));

        const newPayload = first(anyMovieExists);

        newPayload[action]    = action_value;
        updateRentlist.movies = updateRentlist.movies.filter(e => e.movie.toString() !== movie);
        updateRentlist.movies.unshift(newPayload);

        await updateRentlist.save();

        return res.status(status.OK).json(response(true, updateRentlist, 'Rent Cancelled'));

    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json(error_response(err));
    }
};

generate_rent_payload = ( movie ) => {
    return {
        movie,
        startday:   moment().utc().format('MMMM Do YYYY, hh:mm A'),
        endday:     moment().utc().add(48, 'hours').format('MMMM Do YYYY, hh:mm A'),
        createdAt:  moment().utc().format("YYYY-MM-DD[T]HH:mm"),
        expireAt:   moment().utc().add(48, 'hours').format("YYYY-MM-DD[T]HH:mm")
    };
};
