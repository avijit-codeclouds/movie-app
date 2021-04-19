const cron                   = require('node-cron');
const { expire_rent_movie }  = require('./Rentjob');
const { modifyExpire }       = require('./rendModifications');


//Expiry Cron

exports.expiry_cron = () => cron.schedule('* * * * *', () => {
                                expire_rent_movie();
                                modifyExpire();
                            });


