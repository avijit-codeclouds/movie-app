const express     = require('express');
const Customer    = require('../models/Customer');
const status      = require('http-status');
const APIFeatuers = require('../utils/apiFeatures');
const helper      = require('../helper/helper');

exports.get_all_customers = async (req, res) => {
    try {
        const features = new APIFeatuers(Customer.find(), req.query)
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

exports.create_customer = async (req, res) => {
    try {
        const customer = await Customer.create(req.body);

        res.status(status.CREATED).json(helper.response(true, customer));
    } catch (err) {
        res.status(status.INTERNAL_SERVER_ERROR).json(helper.response(false, err));
    }
};

exports.get_customer = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);

        res.status(status.OK).json(helper.response(true, customer));
    } catch (err) {
        res.status(status.INTERNAL_SERVER_ERROR).json(helper.response(false, err));
    }
};

exports.edit_customer = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(status.OK).json(helper.response(true, customer));
    } catch (err) {
        res.status(status.INTERNAL_SERVER_ERROR).json(helper.response(false, err));
    }
};

exports.delete_customer = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);

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

        const act = req.body.lock ? true : false;

        const customer = await Customer.findByIdAndUpdate(req.params.id, {
            isLocked: act
        }, {
            new: true,
        });

        res.status(status.OK).json(helper.response(true, customer, "Customer locked successfully!"));

    } catch (err) {
        res.status(status.INTERNAL_SERVER_ERROR).json(helper.response(false, err));
    }
};