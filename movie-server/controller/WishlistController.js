require('dotenv').config();
const status = require('http-status');
const { data, cssNumber } = require('jquery');
const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );
const Movie = require('../models/Movie');
const bcrypt = require('bcrypt');
const { check, validationResult, body } = require('express-validator');
const Wishlist = require('../models/Wishlist');



// exports.wishList=async(req,res,next)=>{
//     // console.log(req.body.user);
//     // try {
//     //     const errors = validationResult(req);
//     //     if (!errors.isEmpty()) {
//     //         return res.status(status.OK).json({ errors: errors.array() });
//     //     }
      
//             Wishlist.find({ user: req.body.user,movie:req.body.movie }).then((wishlist) => {
//                 if (wishlist.length >= 1) {
//                     res.status(201).json({
//                         message: 'wishlist already exists',
//                         success: false
//                     })
//                 }
        
//         var wishlist = new Wishlist({
//             user: req.body.user,
//             movie: req.body.movie,
//         });
//         // console.log(req.body);
//         let newWishlist = wishlist.save();

//      if(newWishlist){
//         Movie.findOneAndUpdate({_id: newWishlist.movie},{ $set: {'isChecked': 'true'} }, { upsert: true, new: true }).then(movie =>{
//                         // res.json(playerinfo)
//                         console.log(movie);
//         })
//     }
//     //     //     if(newWishlist.user && newWishlist.movie){
//     //     //     let updated=Wishlist.find({user:newWishlist.user,movie:newWishlist.movie});
//     //     //     console.log('updated');
//     //     //     }
//     //         // else{
//     //         Movie.findOneAndUpdate({_id: newWishlist.movie},{ $set: {'isChecked': 'true'} }, { upsert: true, new: true }).then(movie =>{
//     //             // res.json(playerinfo)
//     //             console.log(movie);
//     //             // if(movie){
//     //             //     Movie.findOneAndUpdate({_id: newWishlist.movie,isChecked:true},{ $set: {'isChecked': 'false'} }, { upsert: true, new: true }).then(movie1 =>{
//     //             //         // res.json(playerinfo)
//     //             //         console.log(movie1);
//     //             //    });
//     //             // }
//     //        });
           
           
//     //   }
//     // //  }
        
//     // //     else{
//     // //         // movie.isChecked=false;
//     // //         // (await movie).save()
//     // //         console.log('not matched')
//     // //     }
//     //     // console.log(newWishlist);
//     //     return res.status(status.OK).json({ success: true, result: 'successfully movie wishlist saved',result: newWishlist })
//     // catch (err) {
//     //     return res.status(status.INTERNAL_SERVER_ERROR).json({ success: false,msg:'invalid credentials',result: err })
//     })

// }
exports.wishList =  (req, res, next) => {
    // console.log(req.body.user);
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(status.OK).json({
                errors: errors.array()
            });
        }
        Wishlist.find({user:req.body.user,movie:req.body.movie}).then((w)=>{
            if(w.length>=1){
            return res.status(status.OK).json({
                success: false,
                result: 'already exists',
            })
        }
        else{
            // const payload = {
            //     movie,isChecked
            // }
        
            var wishlist = new Wishlist({
                        user: req.body.user,
                        movies: req.body.movies
                    });
           wishlist.save().then((newWishlist)=>{
            console.log(newWishlist);
            // if(newWishlist){
            //     Movie.findOneAndUpdate({_id: newWishlist.movie},{ $set: {'isChecked': 'true'} }, { upsert: true, new: true }).then(movie =>{
            //         //                 // res.json(playerinfo)
            //                         console.log(movie);
            //     })
            // }
            return res.status(status.OK).json({
             success: true,
             result: 'successfully movie wishlist saved',
             result: newWishlist
           })
           
          
            })
            
        }
        })
    //     var wishlist = new Wishlist({
    //         user: req.body.user,
    //         movie: req.body.movie,
    //     });
    //     // console.log(req.body);
    //     const newWishlist =  wishlist.save();
    //     // console.log(newWishlist);
    //     if(newWishlist){
    //         Movie.findOneAndUpdate({_id: newWishlist.movie},{ $set: {'isChecked': 'true'} }, { upsert: true, new: true }).then(movie =>{
    //             //                 // res.json(playerinfo)
    //                             console.log(movie);
    //         })
    //     return res.status(status.OK).json({
    //         success: true,
    //         result: 'successfully movie wishlist saved',
    //         result: newWishlist
    //     })
    // }
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            success: false,
            msg: 'invalid credentials',
            result: err
        })
    }
}