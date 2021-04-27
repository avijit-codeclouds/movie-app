require("dotenv").config();
const status 		= require("http-status");
const Movie 		= require("../models/Movie");
const Rent			= require("../models/Rent");
const APIFeatuers 	= require("../utils/apiFeatures");
const { response } 	= require("../helper/helper");
const { logger }    = require("../helper/logger");

exports.create_movie = async (req, res) => {
	try {
		const
			{
				title,
				genre,
				rating,
				year,
				rate,
				trailerUrl,
				description
			} = req.body;

		movie = new Movie({
			title,
			genre,
			rate,
			year,
			rating,
			trailerUrl,
			description
		});

		const newMovie = await movie.save();
		const msg = "Movie Successfully saved";

		return res.status(status.CREATED).json(response(true, newMovie, msg));

	}
	catch (err)
	{
		console.log(err);
		return res.status(status.INTERNAL_SERVER_ERROR).json(response(false, err));
	}
};

exports.view_movie = async (req, res) => {
	try
	{
		let movie = await Movie.findById(req.params.movie_id);
		if (!movie)
		{
			return res.status(status.OK).json(response(false, movie, 'Movie is not available'));
		}

		const msg = "Here is your movie";

		return res.status(status.OK).json(response(true, movie, msg));
	}
	catch (err)
	{
		return res.status(status.INTERNAL_SERVER_ERROR).json(response(false, err));
	}
};

exports.update_movie = async (req, res) => {
	try
	{
		const { title, genre, stock, rate } = req.body;

		let movie = await Movie.findById(req.params.movie_id);

		if (!movie)
		{
			return res.status(status.NOT_FOUND).json(response(false, movie,'Movie is not available'));
		}

		const payload = {
			title,
			genre,
			stock,
			rate,
		};

		const updateMovie = await Movie.findByIdAndUpdate(
			req.params.movie_id,
			payload,
			{
			new: true,
			}
		);

		const msg = "Movie Updated";

		return res.status(status.OK).json(response(true, updateMovie, msg));

	}
	catch (err)
	{
		return res.status(status.INTERNAL_SERVER_ERROR).json(response(false, err));
	}
};

exports.movie_list = async (req, res) => {
	try
	{

		const msg = "movie list";
		const features = new APIFeatuers(Movie.find().populate("genre"),req.query)
						.filter()
						.sort()
						.limitFields()
						.paginate();

		const movie = await features.query;

		return res.status(status.OK).json(response(true, movie, msg));
	}
	catch (err)
	{
		return res.status(status.INTERNAL_SERVER_ERROR).json(response(false, err));
	}
};

exports.delete_movie = async (req, res) => {
	try
	{
		let movie = await Movie.findById(req.params.movie_id);

		if (!movie)
		{
			return res.status(status.NOT_FOUND).json(response(false, movie,'Movie is not available'));
		}

		const getMovie = await Movie.findById(req.params.movie_id);

		getMovie.deletedAt = Date.now();
		getMovie.isDeleted = true;

		await getMovie.save();

		const msg = "Movie Deleted";

		make_rented_movies_available(req.params.movie_id, false);

		return res.status(status.OK).json(response(true,null,'movie deleted'));

	}
	catch (err)
	{
		return res.status(status.INTERNAL_SERVER_ERROR).json(response(false, err));
	}
};

exports.restore_movie = async (req, res) => {
	try
	{
		let movie = await Movie.findById(req.params.movie_id);

		if (!movie)
		{
			return res.status(status.NOT_FOUND).json(response(false, movie,'Movie is not available'));
		}

		const getMovie = await Movie.findById(req.params.movie_id);

		getMovie.deletedAt = null;
		getMovie.isDeleted = false;

		await getMovie.save();

		const msg = "Movie Restored";

		make_rented_movies_available(req.params.movie_id, true);

		return res.status(status.OK).json(response(true, null, "Movie restored"));

	}
	catch (err)
	{
		return res.status(status.INTERNAL_SERVER_ERROR).json(response(false, err));
	}
};

const make_rented_movies_available = async (id, action) => {

	try
	{
		const msg = action ? "RESTORE" : "DELETE";

		const rent = await Rent.updateMany({ "movies.movie": id }, { "movies.$.available": action} , {
			arrayFilters: [
				{
					'movies.$.movie': id
				}]
			});

		logger.info("MOVIE-"+ msg +" event. changes in rental for Movie ID: "+id);
	} catch( err )
	{
		logger.error(JSON.stringify(err) + " for movie ID: "+ id);
	}
};
