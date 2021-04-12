const { validationResult } = require('express-validator');

exports.response = (success = null, result = null, message = null) => {
    return {
        success,
        result,
        message
    };
};

exports.handleValidationError = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(403).json({ success: false, result: errors.array(), message: "Validation Failed!"});
    }

    next();
};