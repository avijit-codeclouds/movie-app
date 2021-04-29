const express       = require('express');
const Genre         = require('../models/Genere');
const status        = require('http-status');
const APIFeatuers   = require('../utils/apiFeatures');
const { response, error_response }        = require('../helper/helper');

exports.create_genere = async (req, res) => {
    try
    {
        const genre = await Genre.create(req.body);

        res.status(status.CREATED).json(response(true, genre));

    } catch (err) {

        res.status(status.INTERNAL_SERVER_ERROR).json(error_response(err));
    }
};

exports.get_all_genere = async (req, res) => {
    try {
        const features = new APIFeatuers(Genre.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();

        const genre = await features.query;

        const message = genre.length > 0 ? "All generes" : "No genere found";

        res.status(status.OK).json(response(true, genre, message));

    } catch (err) {
        res.status(status.INTERNAL_SERVER_ERROR).json(error_response(err));
    }
};