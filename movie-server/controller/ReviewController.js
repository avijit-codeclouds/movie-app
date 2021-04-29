const status = require("http-status");
const mongoose = require('mongoose');
const Review = require("../models/Reviews");
const {decode_jwt, response, error_response} = require("../helper/helper");

exports.add_review = async (req, res) => {
    try {
        const {
            review,
            isAnonymous
        } = req.body;

        const user    = decode_jwt(req);
        const userID  = user.id;
        const movieID = req.params.movieID;

        const addRev = new Review({
            userID,
            movieID,
            review,
            isAnonymous
        });

        const newReview = await addRev.save();

        return res.status(status.OK).json(response(true, newReview, 'Review successfully saved'));

    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json(response(false, err));
    }
};

exports.view_review = async ( req, res) => {

    try
    {
        const movieID = req.params.movieID;
        let name;

        let reviews = await Review.find({ movieID }).populate({
                                    path: 'userID',
                                    select: 'name'
                                });

        let demo = [...reviews];

        demo.forEach( (item, index)=> {
            name = item.isAnonymous ? 'Anonymous' : item.userID.name;
            demo[index].userID = {name};
        });

        return res.status(status.OK).json(response(true, demo, demo ? 'Reviews has been fetched' : 'No Review found' ));

    } catch(err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json(error_response(err));
    }


};