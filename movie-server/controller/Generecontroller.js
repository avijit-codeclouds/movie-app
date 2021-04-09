const express   = require('express');
const mongoose  = require('mongoose');
const Genere    = require('../models/Genere');
const bcrypt    = require('bcrypt');
const jwt       = require('jsonwebtoken');
const status    = require('http-status');

exports.create_genere = (req, res) => {
    if (req.body.name === '' || req.body.details === '')
    {
        res.status(201).json({
            message: 'All Fields are required',
            success: false
        });

    } else {
        try
        {
            const genere = new Genere({
                name: req.body.name,
                details: req.body.details,
            });

            genere.save().then((genere) => {
                res.status(status.OK).json({
                    message: 'Genere Added Successfully',
                    genere: genere,
                    success: true
                });

            }).catch((err) => {
                console.log(err);
                res.status(status.FORBIDDEN).json({ message: "Name and Details field is required", success: false });
            });
        }

        catch (e) {
            res.status(status.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong ", success: false });
        }
    }
};

exports.get_genere = (req, res) => {

    Genere.find().select('name details date _id').then((genere) => {
        if (genere.length > 0) {
            res.status(status.OK).json({ message: "All generes", genere: genere, success: true });
        } else {
            res.status(status.OK).json({ message: "No genere found", success: true });
        }
    }).catch((err) => {
        res.status(status.INTERNAL_SERVER_ERROR).json({ message: "something went wrong ", success: false });
    });

};