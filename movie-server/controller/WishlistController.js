require('dotenv').config();
const status = require('http-status');
const Movie = require('../models/Movie');
const { check, validationResult, body } = require('express-validator');
const Wishlist = require('../models/Wishlist');
const User = require('../models/User');


exports.wishList = async (req, res, next) => {
    // console.log(req.body.user);
     try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(status.OK).json({
                errors: errors.array()
            });
        }

      //   let newWishlist = new Wishlist();
      //   newWishlist.user = req.body.user;
      //   newWishlist.movies=req.body.movies;
      //   console.log(newWishlist);
      //   newWishlist.save(function(err) {
      //     if(!err) {
      //         console.log('listsaved');
      //     }
      //     else {
      //         console.log("Error: could not saved ");
      //     }
      // });
                             
        //    wishlist = new Wishlist({
        //         user: req.body.user,
        //        movies : req.body.movies,
        //     });
        //     const newwishlist = await wishlist.save();
        // console.log(req.body);
        // let getMovie = await Movie.findById(movie)
        // console.log(getMovie);
        // if(!getMovie){
        //     return res.status(status.OK).json({ success : false, msg : 'invalid movie' })
        // }
        // console.log(user);
        // console.log(req.body.movies);
        // let getUser = await User.findById(req.body.user)
        // if(!getUser){
        //     return res.status(status.OK).json({ success : false, msg : 'invalid user' })
        // }
        // const payload = {
        //     movie
        // }
        // console.log(payload)
        // let getUser=await Wishlist.findOne({user:req.body.user});
        // const payload = {
        //    movies
        // }
     
        // if(!getUser){
       
           
            let getUser=await Wishlist.find({user:req.body.user})
            // console.log(getUser);
            if(getUser.length===0){
              let newWishlist = new Wishlist();
              newWishlist.user = req.body.user;
              newWishlist.movies=req.body.movies;
              console.log(newWishlist);
              newWishlist.save(function(err) {
                if(!err) {
                    console.log('listsaved');
                }
                else {
                    console.log("Error: could not saved " +err);
                }
            });
            }
         
            if(getUser.length > 0){
              // console.log('user' +getUser);
            let getMovie=await Wishlist.find({movies:getUser[0].movies});
            console.log(getMovie);
            getMovie.forEach((movieFav)=>{
             let m= movieFav.movies.includes(req.body.movies.toString())
                 console.log(movieFav.movies);
                  console.log(m)
                if(m){
                    // console.log(movieFav)
                    var movieIndex = movieFav.movies.indexOf(req.body.movies.toString());
                   console.log(movieIndex)
                    movieFav.movies.splice(movieIndex, 1); 
                    Wishlist.findOne({user: req.body.user}, function(err, w) {
                        if(!err) {
                            if(!w) {
                                w = new Wishlist();
                                w.user = req.body.user;
                                w.movies=req.body.movies;
                                console.log(w);
                                w.save(function(err) {
                                  if(!err) {
                                      console.log('listsaved');
                                  }
                                  else {
                                      console.log("Error: could not saved ");
                                  }
                              });
                          
                            }
                            else{
                            w.movies =  movieFav.movies;
                            w.save(function(err) {
                                if(!err) {
                                    console.log('listsaved');
                                }
                                else {
                                    console.log("Error: could not saved ");
                                }
                            });
                        }
                      }
                    });  
                    // let updateMovieList =  Wishlist.findOne(getUser._id)  ;
                    // updateMovieList.movies=movieFav.movies;
                    // // updateMovieList.save()
                    //  console.log(updateMovieList.movies);
                                            
                  
                                            // updateMovieList.movies=movieFav.movies;
                    // updateMovieList.save().then((mov)=>{
                    //     console.log(mov)
                    // });
                    
                //   let  arr = movieFav.movies.filter(e => e==req.body.movies);
                //      //movieFav.movies.splice(1,1);
                 
                    //  let fav= Wishlist.updateOne(
                    //     { user: req.body.user },
                    //     { $set:
                    //        {
                    //          movies: [movieFav],
                    //        }
                        
                    //     }
                    
                    //  )
                    //  console.log(fav)
                    // Wishlist.findOneAndUpdate({user:getUser}, 
                    //     {movies:movieFav}, null, function (err, docs) {
                    //     if (err){
                    //         console.log(err)
                    //     }
                    //     else{
                    //         console.log("Original Doc : ",docs);
                    //     }
                    // });
                    // wishlist=Wishlist.findOne({user:getUser})
                    // wishlist.movies=movieFav
                    // wishlist.update();
                    // console.log('hell');
                //     wishlist.user=getUser;
                //     wishlist.movies=movieFav;
                //     //     user: req.body.user,
                //     //    movies :movieFav
                //     // });
                //    wishlist.update().then((favorite)=>{
                //     console.log(favorite);
                //    });
                    
                    // Wishlist.updateOne(
                    //     { movies: req.body.movies },
                    //     { $pull:movies } 
                    //   );
                    // console.log(movieFav.push(req.body.movies))
                    // wishlist = new Wishlist({
                        // user:req.body.user,
                        // movies :movieFav
                    // });
                    //  wishlist.save();
                }
                else{
                   console.log('hello');
                    Wishlist.findOne({user: req.body.user}, function(err, w) {
                        if(!err) {
                            if(!w) {
                                w = new Wishlist();
                                w.user = req.body.user;
                                w.movies=req.body.movies;
                                w.save(function(err) {
                                    if(!err) {
                                        console.log('saved');
                                    }
                                    else {
                                        console.log("Error: could not saved ");
                                    }
                                });
                            }
                            else{
                            console.log(w.movies)
                            let favMovie=req.body.movies.toString();
                            console.log(req.body.movies.toString())
                            // newArray = (w.movies.concat(favMovie));
                            newArray = [...w.movies, favMovie]; 
                            console.log(newArray)  
                            w.movies =newArray
                            w.save(function(err) {
                                if(!err) {
                                    console.log('saved');
                                }
                                else {
                                    console.log("Error: could not saved ");
                                }
                            });
                        }
                      }
                    }); 
                   
                   
                }
            })
                
               
            }
           
          }
      
        
            // if(req.body.user find in wishlist.user )
            //     {
            //         search movie?true: delete movie , false:insert or push wishlist.movies.push(req.body.movie)
            //     }
            //     else{
            //         insert into wishlist.user=req.body.user && wishlist.movies.push=req.body.movies
            //     }
            // wishlist = new Wishlist({
            //     user: req.body.user,
            //    movies : req.body.movies
            // });
            // const newwishlist = await wishlist.save();
            // return res.status(status.OK).json({ success: true, result: 'successfully wishlist saved',result: newwishlist })
       // }
        // else{
        //      console.log(getUser.movies)
        //     if (getUser.movies.some((movies) => movies.movie === req.body.movies )) {
        //         return res.status(status.OK).json({ success: false, result: 'movie already on fav' });
        //     }
            // else{
            //     getUser.movies.unshift(payload)
            //     const movieList = await getUser.save();
            //     return res.status(status.OK).json({ success: true, result: 'successfully wishlist saved',result: movieList })
            // }
        // }
        // if(getUser){
        //         wishlist = new Wishlist({
        //             user: req.body.user,
        //             movies : req.body.movies
        //         });
        //         console.log(wishlist);
                // const newRent = await wishlist.save();
                // return res.status(status.OK).json({ success: true, result: 'successfully wishlist added',result: wishlist })
                // console.log(wishlist)
            // if (wishListuser.movies.some((movies) =>{
            //      console.log(movies)
            // })
        //}
            //      ) {
            //     return res.status(status.OK).json({ success: false, result: 'movie already on wishlist' });
            // }
            // }else{
            //     wishListuser.movies.unshift(payload)
            //     const movieList = await getUser.save();
            //     return res.status(status.OK).json({ success: true, result: 'successfully rent saved',result: movieList })
            // }
            // req.body.movies.forEach(e => {
            //    console.log(e.movie) 
            //    let wishListMovie= Wishlist.find({movie:e.movie});
            // //    console.log(wishListMovie);
            //    if(wishListMovie){
          
            //     // arr.splice(i, 1);
            //        console.log('hello')
            //    }

            // });
            // let favMovie=await Wishlist.find({movie:req.body})
            // console.log('hi');
        // }
        // else{
        
        


        // console.log(req.body.movies[0].movie);
        // let getMovie = Movie.findById(movie);
        // console.log(getMovie);
        // if(!getMovie){
        //     return res.status(status.OK).json({ success : false, msg : 'invalid movie' })
        // }
    //     Wishlist.find({ user: req.body.user, movie: req.body.movie }).then((w) => {
    //         if (w.length >= 1) {
    //             return res.status(status.OK).json({
    //                 success: false,
    //                 result: 'already exists',
    //             })
    //         }
    //         else {

                // var wishlist = new Wishlist({
                //     user: req.body.user,
                //     movies: req.body.movies
                // });
                // console.log(req.body)
                // console.log(movies.JSON.stringify(movies));
            //    let newWishlist=await wishlist.save();
            //    return res.status(status.OK).json({
            //                         success: true,
            //                         result: 'successfully movie wishlist saved',
            //                         result: newWishlist
            //                     })
                            
                          

            //    .then((newWishlist) => {
    //                 console.log(newWishlist);
    //                 // if(newWishlist){
    //                 //     Movie.findOneAndUpdate({_id: newWishlist.movie},{ $set: {'isChecked': 'true'} }, { upsert: true, new: true }).then(movie =>{
    //                 //         //                 // res.json(playerinfo)
    //                 //                         console.log(movie);
    //                 //     })
    //                 // }
    //                 return res.status(status.OK).json({
    //                     success: true,
    //                     result: 'successfully movie wishlist saved',
    //                     result: newWishlist
    //                 })


    //             })

    //         }
    //     })
     catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            success: false,
            msg: 'invalid credentials',
            result: err
        })
     }

}



exports.getWishList = (req, res, next) => {

    Wishlist.find({user:req.params._id}).select('user movies _id date').then((fav) => {
        if (fav.length > 0) {
            return res.status(status.OK).json({
                success: true,
                msg: 'All wishlists',
                result: fav
            });
        }
        else {
            return res.status(404).json({
                success: false,
                msg: 'No wishlist Found',
                result:[]
            });


        }
    })
}






// exports.wishList =  async (req, res, next) => {

//     try {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(status.OK).json({ errors: errors.array() });
//         }
//         const { user, movie } = req.body;
//         console.log(movie[0]);
//         let getMovie = await Movie.findById(movie)
//         if(!getMovie){
//             return res.status(status.OK).json({ success : false, msg : 'invalid movie' })
//         }

//         const getUser = await Wishlist.findOne({ user: user })
//         const payload = {
//             movie,isChecked
//         }
//         if(!getUser){
//             wishList = new Wishlist({
//                 user: user,
//                 movies : payload
//             });
//             const newWishlist = await wishList.save();
//             return res.status(status.OK).json({ success: true, result: 'successfully movie added to wishlist',result: newRent })
//         }else{
//             // console.log(getUser.movies)
//             if (getUser.movies.some((movies) => movies.movie.toString() === movie )) {
//                 return res.status(status.OK).json({ success: false, result: 'movie already on wishlisted' });
//             }else{
//                 getUser.movies.unshift(payload)
//                 const movieList = await getUser.save();
//                 return res.status(status.OK).json({ success: true, result: 'successfully movie added to wishlist',result: movieList })
//             }
//         }
//     } catch (err) {
//         console.log(err)
//         return res.status(status.INTERNAL_SERVER_ERROR).json({ success: false, result: err })
//     }

    // console.log(req.body.user);
    // try {
    //     const errors = validationResult(req);
    //     if (!errors.isEmpty()) {
    //         return res.status(status.OK).json({
    //             errors: errors.array()
    //         });
    //     }
    //     Wishlist.find({user:req.body.user,movie:req.body.movie}).then((w)=>{
    //         if(w.length>=1){
    //         return res.status(status.OK).json({
    //             success: false,
    //             result: 'already exists',
    //         })
    //     }
    //     else{
    //         // const payload = {
    //         //     movie,isChecked
    //         // }

    //         var wishlist = new Wishlist({
    //                     user: req.body.user,
    //                     movies: req.body.movies
    //                 });
    //        wishlist.save().then((newWishlist)=>{
    //         console.log(newWishlist);
    //         // if(newWishlist){
    //         //     Movie.findOneAndUpdate({_id: newWishlist.movie},{ $set: {'isChecked': 'true'} }, { upsert: true, new: true }).then(movie =>{
    //         //         //                 // res.json(playerinfo)
    //         //                         console.log(movie);
    //         //     })
    //         // }
    //         return res.status(status.OK).json({
    //          success: true,
    //          result: 'successfully movie wishlist saved',
    //          data: newWishlist
    //        })


    //         })

    //     }
    //     })

// }