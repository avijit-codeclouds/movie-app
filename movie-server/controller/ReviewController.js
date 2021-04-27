const status = require("http-status");
const mongoose = require('mongoose');
const Review = require("../models/Reviews");
const {decode_jwt, response} = require("../helper/helper");

exports.addReview = async (req, res) => {
    try {
        const {
            review,
            isAnonymous
        } = req.body;

        if(!isAnonymous){
            const userID = decode_jwt(req).id;
        }
        else{userID = null;}

        const addRev = new Review({
            userID: userID,
            movieID: mongoose.Types.ObjectId(req.params.movieID),
            review: review,
            isAnonymous: isAnonymous
        });

        const newReview = await addRev.save();
        return res.status(status.OK).json(response(true, newReview, 'Review successfully saved'));

    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json(response(false, err));
    }
};