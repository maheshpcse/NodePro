var CronJob = require('cron').CronJob;
var config = require('../config/config.js');
var server = require('../config/db.js');

new CronJob('*/10 * * * * *', (req, res, next) => {
    console.log("Cron is running...");
    // checkServerConnection(req, res, next);
}, null, false);

new CronJob('* */5 * * * *', () => {
    console.log("Cron is running every 5 minutes...");
}, null, false);

let checkServerConnection = (req, res, next) => {
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
                    statusCode: 402,
                    message: 'Database access denied for user, check your db credentials',
                    data: err,
                });
            }
        } else if (result != null || result != undefined) {
            console.log("Database connection secured");
            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Database connection secured',
                data: result
            });
        } else {
            console.log("Server is not connected to db");
            res.status(200).json({
                success: false,
                statusCode: 404,
                message: 'Server is not connected to db',
                data: null
            });
        }
    });
}

module.exports = {
    checkServerConnection
}