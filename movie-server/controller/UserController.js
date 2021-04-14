const express       = require('express');
const mongoose      = require('mongoose');
const User          = require('../models/User');
const bcrypt        = require('bcrypt');
const jwt           = require('jsonwebtoken');
const status        = require('http-status');
const constants     = require('../constant');
const {
        response,
        jwt_sign_in,
        first
        }           = require('../helper/helper');

exports.register_user = async (req, res ) => {

    try
    {
        const user = await User.find({ email: req.body.email });

        if (user.length >= 1)
            res.status(status.BAD_REQUEST).json(response(false, null , 'Similar User already exists!'));

        bcrypt.hash(req.body.password, constants.SALT_ROUNDS , async (err, hash) => {

            if(err)
                throw new Error('Bcrypt Failure');

            const newUser = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: hash
            });

            res.status(status.OK).json(response(true, newUser, 'Registered Successfully'));
        });

    } catch(err) {
        res.status(status.INTERNAL_SERVER_ERROR).json(response(false, err));
    }
};


exports.login_user = async (req, res) => {

    try
    {

        let user = await User.find({ email: req.body.email }).limit(1);

        if (user.length < 1)
            res.status(status.BAD_REQUEST).json(response(false, null , "User doesn't exists!"));

        user = first(user);

        bcrypt.compare(req.body.password, user.password, (err, result) => {

            if(err)
                throw new Error('Bcrypt Failure');

            if(result)
            {
                const token = jwt_sign_in(user.email, user.name, user._id);

                return res.status(status.OK).json(response(true, { user, token } , 'Login Successful'));
            }

            return res.status(status.FORBIDDEN).json(response(false, null , 'Invalid Credentials'));
        });

    } catch(err) {
        res.status(status.INTERNAL_SERVER_ERROR).json(response(false, err));
    }
};
