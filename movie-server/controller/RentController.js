require('dotenv').config();
const status        = require('http-status');
const Movie         = require('../models/Movie');
const Rent          = require('../models/Rent');
const APIFeatuers   = require('../utils/apiFeatures');
const { response, first } = require('../helper/helper');
const { get } = require('../routes');

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
        return res.status(status.INTERNAL_SERVER_ERROR).json( response(false, err) );
    }
};

exports.rent_movie = async( req,res ) => {
    try
    {
        const { user, movie } = req.body;
        let getMovie = await Movie.findById(movie);

        if(!getMovie)
            return res.status(status.OK).json(response(false, null, 'Invalid Movie'));


        const getUser = await Rent.findOne({ user });
        const payload = {
            movie
        };

        if(!getUser)
        {
            rent = new Rent({
                user,
                movies : payload
            });
            const newRent = await rent.save();
            return res.status(status.OK).json(response(true, newRent, 'Rent successfully saved'));
        }

        if(getUser.isLocked === true){
            return res.status(status.OK).json(response(false, null, 'Your account is locked, Talk with Administrator'));
        }
        if (getUser.movies.some((movies) => movies.movie.toString() === movie )) {
            return res.status(status.OK).json(response(false, null, 'Movie already on rent'));
        }

        getUser.movies.unshift(payload);
        const movieList = await getUser.save();
        return res.status(status.OK).json(response(true,movieList,'Rent saved successfully'));

    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json(response(false, err));
    }
};

exports.rent_delete = async(req,res) => {
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
            return res.status(status.OK).json(response(false, null ,'Invalid Movie'));
        }

        updateRentlist.movies = updateRentlist.movies.filter(e => e.movie.toString() !== movie);
        await updateRentlist.save();
        return res.status(status.OK).json(response(true,updateRentlist,'Rent List updated'));

    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json(response(false,err))
    }
}

exports.rent_list = async( req, res ) => {
    try {

        const features = new APIFeatuers(Rent.find().populate(['movies.movie']).
        populate({ path: 'user', select: '-password' }), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();

        const rent = await features.query;
        return res.status(status.OK).json(response(true,rent));

    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json(response(false,err));
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
        console.log(err);
        return res.status(status.INTERNAL_SERVER_ERROR).json(response(false, err));
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
            return res.status(status.OK).json(response(false, null, 'Invalid Movie'));

        const newPayload = first(anyMovieExists);

        newPayload[action]    = action_value;
        updateRentlist.movies = updateRentlist.movies.filter(e => e.movie.toString() !== movie);
        updateRentlist.movies.unshift(newPayload);

        await updateRentlist.save();

        return res.status(status.OK).json(response(true, updateRentlist, 'Rent Cancelled'));

    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json(response(false, err));
    }
};
