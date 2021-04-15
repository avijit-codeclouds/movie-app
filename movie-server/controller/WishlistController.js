require("dotenv").config();
const express        = require('express');
const status         = require("http-status");
const Movie          = require("../models/Movie");
const Wishlist       = require("../models/Wishlist");
const User           = require("../models/User");
const { decode_jwt, response, first } = require('../helper/helper');

exports.create_wishlist = async (req, res) => {

	try
	{
		const user    = decode_jwt(req);
		const getUser = await Wishlist.find({ user: user.id }).limit(1);

		if(getUser.length === 0)
		{
			const wishlist = await Wishlist.create({
							user: user.id,
							movies: req.body.movies
							});

			return res.status(status.CREATED).json(response(true, wishlist, "Movie added to Wishlist!"));
		}

		let existingMovies  = first(getUser).movies;

		const index = existingMovies.indexOf(req.body.movies);

		req.body.checked ? existingMovies.push(req.body.movies) : index > 0 ? existingMovies.splice(index , 1) : null;

		const updatedWishlist = await Wishlist.findByIdAndUpdate(getUser._id, { movies: existingMovies });

		return res.status(status.OK).json(response(true, getUser, "Wishlist Updated"));

	} catch (err) {
		return res.status(status.INTERNAL_SERVER_ERROR).json(response(false, err));
	}
};

exports.get_wishlist = async (req, res) => {

	try
	{
		const wishlist = await Wishlist.find({ user: req.params._id }).select("user movies _id date");

		return res.status(status.OK).json(response(true, wishlist, wishlist.length > 0 ? "All wishlists" : "No wishlist Found"));

	} catch (err) {
		return res.status(status.INTERNAL_SERVER_ERROR).json(helper.response(false, err));
	}
};
