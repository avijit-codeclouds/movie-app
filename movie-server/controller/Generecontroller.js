const express       = require('express');
const Genre         = require('../models/Genere');
const status        = require('http-status');
const helper        = require('../helper/helper');
const APIFeatuers   = require('../utils/apiFeatures');

exports.create_genere = async (req, res) => {
    try
    {
        const genre = await Genre.create(req.body);

        res.status(status.CREATED).json(helper.response(true, genre));

    } catch (err) {

        res.status(status.INTERNAL_SERVER_ERROR).json(helper.response(false, err));
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

        res.status(status.OK).json(helper.response(true, genre, message));

    } catch (err) {
        res.status(status.INTERNAL_SERVER_ERROR).json(helper.response(false, err));
    }
};