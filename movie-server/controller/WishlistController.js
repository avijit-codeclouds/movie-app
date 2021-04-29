require("dotenv").config();
const express 		= require("express");
const status 		= require("http-status");
const Movie 		= require("../models/Movie");
const Wishlist 		= require("../models/Wishlist");
const User 			= require("../models/User");
const Genere 		= require("../models/Genere");
const { decode_jwt, response, first, error_response} = require("../helper/helper");

exports.create_wishlist = async (req, res) => {
	try
	{
		const user = decode_jwt(req);
		const getUser = await Wishlist.find({ user: user.id }).limit(1);
		let getMovie = await Movie.findById(req.body.movies);

		if(!getMovie || getMovie.isDeleted === true)
            return res.status(status.OK).json(response(false, null, 'Movie is not available'));

		if (getUser.length === 0) {
		const wishlist = await Wishlist.create({
			user: user.id,
			movies: req.body.movies,
		});

		return res
			.status(status.CREATED)
			.json(response(true, wishlist, "Movie added to Wishlist!"));
		}

		let existingMovies = first(getUser).movies;
		const index 	   = existingMovies.indexOf(req.body.movies);
		if(req.body.checked==true){
			existingMovies.push(req.body.movies)
		}
		else{
			existingMovies.splice(index, 1)
		}

		const updatedWishlist = await Wishlist.findByIdAndUpdate(getUser[0]._id, { movies: existingMovies });

		return res.status(status.OK).json(response(true, getUser, "Wishlist Updated"));

	} catch (err) {
		return res.status(status.INTERNAL_SERVER_ERROR).json(error_response(err));
	}
};

exports.get_wishlist = async (req, res) => {
	try
	{
		const user = decode_jwt(req);
		const wishlist = await Wishlist.find({ user: user.id })
		.select("user movies _id date")
		.populate({
			path: "movies",
			populate: {
			path: "genre",
			model: "Genere",
			},
		}).limit(1);

		if(first(wishlist))
		{
			const movies 		   = first(wishlist).movies;
			const filteredMovies   = movies.filter( (el) => el.isDeleted != true);
			first(wishlist).movies = filteredMovies;
		}

		return res
		.status(status.OK)
		.json(
			response(
			true,
			wishlist,
			wishlist.length > 0 ? "All wishlists" : "No wishlist Found"
			)
		);

	} catch (err) {
		return res.status(status.INTERNAL_SERVER_ERROR).json(error_response(err));
	}
};

exports.delete_wishlist = async (req, res) => {
	try
	{
		const user    = decode_jwt(req);
		const getUser = await Wishlist.find({ user: user.id }).limit(1);

		let existingMovies = first(getUser).movies;

		if (!existingMovies) {
			const invalidMsg = "Invalid Movie";

			return res.status(status.NOT_FOUND).json(response(false, movie, invalidMsg));
		}

		const index = existingMovies.indexOf(req.params.movie_id);

		existingMovies.splice(index, 1);

		const updatedWishlist = await Wishlist.findByIdAndUpdate(getUser[0]._id, {
			movies: existingMovies,
		});

		const msg = "Wishlist Deleted";

		return res.status(status.OK).json(response(true, updatedWishlist, msg));

	} catch (err) {
		return res.status(status.INTERNAL_SERVER_ERROR).json(error_response(err));
	}
};
