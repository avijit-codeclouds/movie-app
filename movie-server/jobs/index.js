const cron                   = require('node-cron');
const { expire_rent_movie }  = require('./Rentjob');
const { modifyExpire }       = require('./rendModifications');
const { cronLog }            = require('../helper/helper');


//Expiry Cron

exports.expiry_cron = async () => cron.schedule('* * * * *', async () => {
                                await expire_rent_movie();
                                await modifyExpire();
                                cronLog('Expiry Cron');
                            });


