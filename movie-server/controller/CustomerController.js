const express   = require('express');
const Customer  = require('../models/Customer');
const status    = require('http-status');
const APIFeatuers = require('../utils/apiFeatures');

exports.get_all_customers = async (req, res) => {
    try {
        const features = new APIFeatuers(Customer.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

        const customer = await features.query;

        res.status(status.OK).json({
            success: true,
            result: customer
        });
    } catch (err) {
        res.status(status.BAD_REQUEST).json({
            success: false,
            result: err
        });
    }
};

exports.create_customer = async (req, res) => {
    try {
        const customer = await Customer.create(req.body);

        res.status(status.CREATED).json({
            success: true,
            result: customer
        });
    } catch (err) {
        res.status(status.BAD_REQUEST).json({
            success: false,
            result: err
        });
    }
};

exports.get_customer = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);

        res.status(status.OK).json({
            success: true,
            result: customer,
        });
    } catch (err) {
        res.status(status.BAD_REQUEST).json({
            success: false,
            result: err
        });
    }
};

exports.edit_customer = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(status.OK).json({
            success: true,
            result: customer,
        });
    } catch (err) {
        res.status(status.BAD_REQUEST).json({
            success: false,
            result: err
        });
    }
};

exports.delete_customer = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);

        res.status(status.NO_CONTENT).json({
            success: true,
            result: null,
        });
    } catch (err) {
        res.status(status.BAD_REQUEST).json({
            success: false,
            result: err
        });
    }
};