const jwt = require('jsonwebtoken');

module.exports = ((req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.jwtSecret);
        req.userData = decoded;
        next();
    }
    catch(err){
        const token = req.header('authorization');
        //check token
        if(!token){
            return res.status(401).json({ message: "Token is required", success: false});
        }
        res.status(401).json({
            message: "Unauthorized",
            success: false
        });
    }
});