const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register_user = (req, res, next) => {
    if (req.body.email == '' && req.body.name == '' || req.body.password == '') {
        res.status(201).json({
            message: 'All Fields are required',
            success: false
        })
    }

    User.find({ email: req.body.email }).then((user) => {
        if (user.length >= 1) {
            res.status(201).json({
                message: 'email already exists',
                success: false
            })
        }
        var emailToValidate = req.body.email;
        var emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        var check = emailRegexp.test(emailToValidate);
        //  console.log(check);
        if (check === false) {
            res.status(201).json({
                message: 'Please provide valid email',
                success: false
            })
        }

        else {


            bcrypt.hash(req.body.password, 10, (err, hash) => {
                const user = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: hash
                });

                user.save().then((user) => {
                    res.status(200).json({
                        message: 'Registered Successfully',
                        user: user,
                        success: true
                    });
                }).catch((err) => {
                    console.log(err)
                    res.status(500).json({ message: "All Fields are required", success: false });
                })
            })
        }
    })
}


exports.login_user = (req, res, next) => {
    // console.log(process.env.jwtSecret);
    if (req.body.email == ''|| req.body.password == '') {
        res.status(201).json({
            message: 'Email and Password Fields are required',
            success: false
        })
    }
    User.find({ email: req.body.email }).then((user) => {
        if (user.length < 1) {
            return res.status(404).json({
                message: 'User does not exist',
                success: false
            });
        }
        
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err) {
                return res.status(404).json({
                    message: 'Failed',
                    success: false
                });
            }
            if (result) {
                const token = jwt.sign({
                    email: user[0].email,
                    name: user[0].name,
                    id: user[0]._id
                },
                    process.env.jwtSecret, { expiresIn: "24h" });
                return res.status(200).json({
                    message: 'Loggedin Successfully',
                    user: user,
                    token: token,
                    success: true
                })
            }
            return res.status(200).json({
                message: 'Invalid Credentials',
                success: false
            })
        })
    }).catch((err) => {
        res.status(500).json({ err: err, success: false })
    });
}
