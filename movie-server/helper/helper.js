const jwt                  = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const constants            = require('../constant');

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
        return res.status(403).json({ success: false, result: errors.array(), message: "Validation Failed!"});
    }

    next();
};

exports.jwt_sign_in = (id, name, email) => {

    const token = jwt.sign(
        {
            email,
            name,
            id
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