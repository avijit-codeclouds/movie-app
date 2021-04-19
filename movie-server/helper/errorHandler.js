const createError   = require('http-errors');
const express       = require('express');

exports.handle_404 = (req, res, next) => {
    next(createError(404));
};

exports.generic_errors = (err, req, res, next) => {
    // render the error page
    res.status(err.status || 500);
    res.json({
        error : {
            message : err.message
        }
    });
};