exports.response = (success = null, result = null, message = null) => {
    return {
        success,
        result,
        message
    };
};