const express = require('express');
const mongoose = require('mongoose');
const Customer = require('../models/Customer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.get_customers = (req, res, next) => {
    Customer.find().select('name').then((customer) => {

    }).catch((err) => {
        res.status(500).json({ message: "something went wrong ", success: false });
    });
}