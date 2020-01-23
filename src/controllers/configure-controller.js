var userquery = require('../library/userquery.js');
var configurations = require('../models/Configurations.js');

module.exports.updateConfig = (req, res, next) => {

    userquery.updateTable('configurations', req.body).then(resp => {
        console.log("configuration updated", resp);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Configuration updated',
            data: resp
        });
    }).catch(err => {
        console.log("Error while updating configuration", err);
        res.status(200).json({
            success: false,
            statusCode: 500,
            message: 'Error while updating configuration',
            data: err
        });
    })
}