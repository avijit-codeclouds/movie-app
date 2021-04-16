require("dotenv").config();
const status 		= require("http-status");
const Movie 		= require("../models/Movie");
const APIFeatuers 	= require("../utils/apiFeatures");
const { response } 	= require("../helper/helper");

exports.create_movie = async (req, res) => {
	try {
		const { title, genre, stock, rate } = req.body;

		movie = new Movie({
			title,
			genre,
			stock,
			rate,
		});

		const newMovie = await movie.save();
		const msg = "Movie Successfully saved";

		return res.status(status.CREATED).json(response(true, newMovie, msg));

	}
	catch (err)
	{
		return res.status(status.INTERNAL_SERVER_ERROR).json(response(false, err));
	}
};

exports.view_movie = async (req, res) => {
	try
	{
		let movie = await Movie.findById(req.params.movie_id);

		const invalidMsg = "Invalid Movie";
		if (!movie)
		{
			return res.status(status.OK).json(response(false, movie, invalidMsg));
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
			const invalidMsg = "Invalid Movie";
			return res.status(status.NOT_FOUND).json(response(false, movie, invalidMsg));
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
		const features = new APIFeatuers(
							Movie.find().populate("genre"),
							req.query
						)
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
			const invalidMsg = "Invalid Movie";

			return res.status(status.NOT_FOUND).json(response(false, movie, invalidMsg));
		}

		const getMovie = await Movie.findByIdAndDelete(req.params.movie_id);

		const msg = "Movie Deleted";

		return res.status(status.NO_CONTENT).json(response(true));

	}
	catch (err)
	{
		return res.status(status.INTERNAL_SERVER_ERROR).json(response(false, err));
	}
};
