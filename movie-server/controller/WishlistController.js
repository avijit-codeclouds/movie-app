require("dotenv").config();
const status = require("http-status");
const Movie = require("../models/Movie");
const { check, validationResult, body } = require("express-validator");
const Wishlist = require("../models/Wishlist");
const User = require("../models/User");

exports.wishList = async (req, res, next) => {
  // console.log(req.body.user);
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(status.OK).json({
        errors: errors.array(),
      });
    }

    let getUser = await Wishlist.find({ user: req.body.user });
    // console.log(getUser);
    if (getUser.length === 0) {
      let newWishlist = new Wishlist();
      newWishlist.user = req.body.user;
      newWishlist.movies = req.body.movies;
      console.log(newWishlist);
      newWishlist.save(function (err,doc) {
        if (!err) {
          return res.status(status.OK).json({
            success: true,
            msg: "Movie added to wishlist for new user",
            result: doc,
          });
        } else {
          return res.status(status.OK).json({
            success: false,
            msg: "Movie not added to wishlist for new user",

          
          
          });     }
      });
    }

    if (getUser.length > 0) {
      // console.log('user' +getUser);
      let getMovie = await Wishlist.find({ movies: getUser[0].movies });
      console.log(getMovie);
      getMovie.forEach((movieFav) => {
        let m = movieFav.movies.includes(req.body.movies.toString());
        console.log(movieFav.movies);
        console.log(m);
        if (m) {
          // console.log(movieFav)
          var movieIndex = movieFav.movies.indexOf(req.body.movies.toString());
          console.log(movieIndex);
          movieFav.movies.splice(movieIndex, 1);
          Wishlist.findOne({ user: req.body.user }, function (err, w) {
            if (!err) {
              if (!w) {
                w = new Wishlist();
                w.user = req.body.user;
                w.movies = req.body.movies;
                console.log(w);
                w.save(function (err,doc) {
                  if (!err) {
                    return res.status(status.OK).json({
                      success: true,
                      msg: "Wishlist updated for existing user",
                      result: doc,
                    });
                  } else {
                    return res.status(status.OK).json({
                      success: false,
                      msg: "Movie not added to wishlist",
                      
                    });
                  }
                });
              } else {
                w.movies = movieFav.movies;
                w.save(function (err,doc) {
                  if (!err) {
                    return res.status(status.OK).json({
                      success: true,
                      msg: "Wishlist updated for existing user",
                      result: doc,
                    });
                  } else {
                    return res.status(status.OK).json({
                      success: false,
                      msg: "Movie not updated to wishlist",
                      
                    });
                  }
                });
              }
            }
          });
        } else {
          console.log("hello");
          Wishlist.findOne({ user: req.body.user }, function (err, w) {
            if (!err) {
              if (!w) {
                w = new Wishlist();
                w.user = req.body.user;
                w.movies = req.body.movies;
                w.save(function (err) {
                  if (!err) {
                    return res.status(status.OK).json({
                      success: true,
                      msg: "Wishlist updated for existing user",
                      result: doc,
                    });
                  } else {
                    return res.status(status.OK).json({
                      success: false,
                      msg: "Movie not updated to wishlist",
                      
                    });
                  }
                });
              } else {
                console.log(w.movies);
                let favMovie = req.body.movies.toString();
                console.log(req.body.movies.toString());
                // newArray = (w.movies.concat(favMovie));
                newArray = [...w.movies, favMovie];
                console.log(newArray);
                w.movies = newArray;
                w.save(function (err,doc) {
                  if (!err) {
                    return res.status(status.OK).json({
                      success: true,
                      msg: "Wishlist updated for existing user",
                      result: doc,
                    });
                  } else {
                    return res.status(status.OK).json({
                      success: false,
                      msg: "Movie not updated to wishlist",
                      
                    });
                  }
                });
              }
            }
          });
        }
      });
    }
  } catch (err) {
    return res.status(status.INTERNAL_SERVER_ERROR).json({
      success: false,
      msg: "invalid credentials",
      result: err,
    });
  }
};

exports.getWishList = (req, res, next) => {
  Wishlist.find({ user: req.params._id })
    .select("user movies _id date")
    .then((fav) => {
      if (fav.length > 0) {
        return res.status(status.OK).json({
          success: true,
          msg: "All wishlists",
          result: fav,
        });
      } else {
        return res.status(404).json({
          success: false,
          msg: "No wishlist Found",
          result: [],
        });
      }
    });
};
