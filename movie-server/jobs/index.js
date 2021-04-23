const cron                   = require('node-cron');
const { expiry_scheduler }   = require('./rendModifications');
const { cronLog }            = require('../helper/helper');


//Expiry Cron

exports.expiry_cron = async () => cron.schedule('* * * * *', async () => {
                                await expiry_scheduler();
                                cronLog('Expiry');
                            });


