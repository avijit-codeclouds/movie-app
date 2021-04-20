const express     = require('express');
const Rent        = require('../models/Rent');
const status      = require('http-status');
const APIFeatuers = require('../utils/apiFeatures');
const helper      = require('../helper/helper');

exports.get_all_customers = async (req, res) => {
    try {

        const user = helper.decode_jwt(req);

        const features = new APIFeatuers(Rent.find().populate(['movies.movie']).populate({ path: 'user', select: '-password' }), req.query)
                        .filter()
                        .sort()
                        .limitFields()
                        .paginate();

        const customer = await features.query;

        res.status(status.OK).json(helper.response(true, customer));

    } catch (err) {
        res.status(status.INTERNAL_SERVER_ERROR).json(helper.response(false, err));
    }
};

exports.get_customer = async (req, res) => {
    try {
        const customer = await Rent.findById(req.params.id);

        res.status(status.OK).json(helper.response(true, customer));
    } catch (err) {
        res.status(status.INTERNAL_SERVER_ERROR).json(helper.response(false, err));
    }
};


exports.delete_customer = async (req, res) => {
    try {
        const user = req.params.id;

        const customer = await Rent.deleteMany({ user });

        res.status(status.NO_CONTENT).json(helper.response(true));
    } catch (err) {
        res.status(status.INTERNAL_SERVER_ERROR).json(helper.response(false, err));
    }
};

exports.handle_customer_lock = async ( req, res) => {
    try {

        /**
         * if req.body.lock = true, then we will lock
         */

        const act  = req.body.lock ? true : false;
        const user = req.params.id;

        const customer = await Rent.updateMany({ user }, {
            isLocked: act
        });

        res.status(status.OK).json(helper.response(true, customer, "Customer locked successfully!"));

    } catch (err) {
        res.status(status.INTERNAL_SERVER_ERROR).json(helper.response(false, err));
    }
};