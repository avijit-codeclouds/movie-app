require("dotenv").config();
const mongoose = require('mongoose');
const status = require("http-status");
const Movie = require("../models/Movie");
const Rent = require("../models/Rent");
const APIFeatuers = require("../utils/apiFeatures");
const {
	response,
	decode_jwt
} = require("../helper/helper");
const {
	logger
} = require("../helper/logger");
const Genere = require('../models/Genere')
const _ = require('lodash');

exports.create_movie = async (req, res) => {
	try {
		const {
			title,
			genre,
			rating,
			year,
			rate,
			trailerUrl,
			description
		} = req.body;

		const thumbnail = get_thumbnail_from_trailer(trailerUrl);

		movie = new Movie({
			title,
			genre,
			rate,
			year,
			rating,
			trailerUrl,
			description,
			thumbnail
		});

		const newMovie = await movie.save();
		const msg = "Movie Successfully saved";

		return res.status(status.CREATED).json(response(true, newMovie, msg));

	} catch (err) {
		console.log(err);
		return res.status(status.INTERNAL_SERVER_ERROR).json(response(false, err));
	}
};

exports.view_movie = async (req, res) => {
	try {
		let movie = await Movie.findById(req.params.movie_id);
		if (!movie) {
			return res.status(status.OK).json(response(false, movie, 'Movie is not available'));
		}

		const msg = "Here is your movie";

		return res.status(status.OK).json(response(true, movie, msg));
	} catch (err) {
		return res.status(status.INTERNAL_SERVER_ERROR).json(response(false, err));
	}
};

exports.update_movie = async (req, res) => {
	try {
		const {
			title,
			genre,
			rating,
			year,
			rate,
			trailerUrl,
			description
		} = req.body;

		let movie = await Movie.findById(req.params.movie_id);

		if (!movie) {
			return res.status(status.NOT_FOUND).json(response(false, movie, 'Movie is not available'));
		}

		const thumbnail = get_thumbnail_from_trailer(trailerUrl);

		const payload = {
			title,
			genre,
			rate,
			year,
			rating,
			trailerUrl,
			description,
			thumbnail
		};

		const updateMovie = await Movie.findByIdAndUpdate(
			req.params.movie_id,
			payload, {
				new: true,
			}
		);

		const msg = "Movie Updated";

		return res.status(status.OK).json(response(true, updateMovie, msg));

	} catch (err) {
		return res.status(status.INTERNAL_SERVER_ERROR).json(response(false, err));
	}
};

exports.movie_list = async (req, res) => {
	try {
		const msg = "movie list";
		const user = decode_jwt(req);
		const isUser = user.role == 'user';

		const isRented = Movie.aggregate([{
				$lookup: {
					from: "rents",
					localField: "_id",
					foreignField: "movies.movie",
					as: "rentData"
				}
			},
			{
				$project: {
					_id: true,
					rating: true,
					isDeleted: true,
					deletedAt: true,
					title: true,
					genre: true,
					stock: true,
					rate: true,
					createdAt: true,
					updatedAt: true,
					year: true,
					trailerUrl: true,
					description: true,
					thumbnail: true,
					"isRented": {
						$cond: {
							if: {
								$and: [{
									$eq: [{
										$arrayElemAt: ["$rentData.movies.canceled", 0]
									}, false]
								}, {
									$eq: ["$rentData.user", mongoose.Types.ObjectId(user.id)]
								}]
							},
							then: true,
							else: false
						}
					}
				}
			}
		]);

		const features = new APIFeatuers(isUser ? isRented : Movie.find().populate("genre"), req.query)
			.sort()
			.paginate();

		const movie = await features.query;
		await Promise.all(_.map(movie, async (x) => {
			return _.assign(x, {
				genre: await Genere.findById(x.genre)
			});
		}))
		return res.status(status.OK).json(response(true, movie, msg));
	} catch (err) {
		return res.status(status.INTERNAL_SERVER_ERROR).json(response(false, err.message));
	}
};

exports.delete_movie = async (req, res) => {
	try {
		let movie = await Movie.findById(req.params.movie_id);

		if (!movie) {
			return res.status(status.NOT_FOUND).json(response(false, movie, 'Movie is not available'));
		}

		const getMovie = await Movie.findById(req.params.movie_id);

		getMovie.deletedAt = Date.now();
		getMovie.isDeleted = true;

		await getMovie.save();

		const msg = "Movie Deleted";

		make_rented_movies_available(req.params.movie_id, false);

		return res.status(status.OK).json(response(true, null, 'movie deleted'));

	} catch (err) {
		return res.status(status.INTERNAL_SERVER_ERROR).json(response(false, err));
	}
};

exports.restore_movie = async (req, res) => {
	try {
		let movie = await Movie.findById(req.params.movie_id);

		if (!movie) {
			return res.status(status.NOT_FOUND).json(response(false, movie, 'Movie is not available'));
		}

		const getMovie = await Movie.findById(req.params.movie_id);

		getMovie.deletedAt = null;
		getMovie.isDeleted = false;

		await getMovie.save();

		const msg = "Movie Restored";

		make_rented_movies_available(req.params.movie_id, true);

		return res.status(status.OK).json(response(true, null, "Movie restored"));

	} catch (err) {
		return res.status(status.INTERNAL_SERVER_ERROR).json(response(false, err));
	}
};

const make_rented_movies_available = async (id, action) => {

	try {
		const msg = action ? "RESTORE" : "DELETE";

		const rent = await Rent.updateMany({
			"movies.movie": id
		}, {
			"movies.$.available": action
		}, {
			arrayFilters: [{
				'movies.$.movie': id
			}]
		});

		logger.info("MOVIE-" + msg + " event. changes in rental for Movie ID: " + id);
	} catch (err) {
		logger.error(JSON.stringify(err) + " for movie ID: " + id);
	}
};

const get_thumbnail_from_trailer = (trailer) => {
	try {
		trailer = trailer.split('.');

		if (trailer[1] !== 'youtube')
			return null;

		const id = trailer[2].split('=')[1];

		return 'https://img.youtube.com/vi/' + id + '/0.jpg';
	} catch (e) {
		return null;
	}

};