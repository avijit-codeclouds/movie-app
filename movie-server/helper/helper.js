const jwt                  = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const constants            = require('../constant');
const status               = require('http-status');

exports.response = (success = null, result = null, message = null) => {
    return {
        success,
        result,
        message
    };
};

exports.handle_validation_error = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(status.OK).json({ success: false, result: errors.array(), message: "Validation Failed!"});
    }

    next();
};

exports.jwt_sign_in = (email, name, id, role) => {

    const token = jwt.sign(
        {
            email,
            name,
            id,
            role
        },
        process.env.jwtSecret,
        {
            expiresIn: constants.JWT_EXPIRE
        }
    );

    return token;
};

exports.first = (obj) => {
    try {
        return Object.values(obj)[0];
    } catch(e) {
        return null;
    }
};

exports.is_admin_domain_name = (email) => {

    try
    {
        const allowedEmailCmpName = ['codeclouds', 'cispl', 'idiomdesign', 'longtail', 'longtailtechnology', 'documentscanner'];

        const secondPart = email.split("@");
        const domainName = secondPart["1"].split(".");

        return allowedEmailCmpName.includes(domainName["0"]);
    }
    catch ( err )
    {
        return null;
    }
};

const decode_jwt = exports.decode_jwt = (req) => {

    try
    {
        const token = req.headers.authorization.split(" ")[1];

        return jwt.verify(token, process.env.jwtSecret);
    }
    catch ( err )
    {
        return null;
    }

};

exports.admin_section = (req, res, next) => {
    const token = decode_jwt(req);

    if(token.role == 'user' || token.role == null)
        return res.status(status.NOT_FOUND).json({ success: false, message: "Not Found"});

    next();
};