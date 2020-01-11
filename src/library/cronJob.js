var CronJob = require('cron').CronJob;
var config = require('../config/config.js');
var server = require('../config/db.js');

new CronJob('*/5 * * * * *', function (req, res, next) {
    server.connection.connect((err, result) => {
        if (err) {
            let response = {
                data: err
            }
            if (response.data.errno === 'ECONNREFUSED') {
                console.log("Databse connection refused, check your db connection", err);
                return res.status(200).json({
                    success: false,
                    statusCode: 500,
                    message: 'Databse connection refused, check your db connection',
                    data: err,
                });
            } else if (response.data.code === 'ER_ACCESS_DENIED_ERROR') {
                console.log("Database access denied for user, check your db credentials", err);
                return res.status(200).json({
                    success: false,
                    statusCode: 500,
                    message: 'Database access denied for user, check your db credentials',
                    data: err,
                });
            }
        } else {
            console.log("Cron is running...");
        }
    });
}, null, true);