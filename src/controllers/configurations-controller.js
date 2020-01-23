require('dotenv').config();
var userquery = require('../library/userquery.js');
var configurations = require('../models/Configurations.js');
const translate = require('google-translate-api');

// Configuration api's

module.exports.addConfiguration = (req, res, next) => {

    let data = {
        config_name: 'Send Notifications',
        role: 'admin',
        viewConfig: 1,
        addConfig: 1,
        updateConfig: 1,
        deleteConfig: 1
    }
    userquery.insertTable('configurations', data).then(resp => {
        console.log("Added configuration");
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Added configuration',
            data: resp
        });
    }).catch(err => {
        console.log("Error while add configuration", err);
        res.status(200).json({
            success: false,
            statusCode: 500,
            message: 'Error while add configuration',
            data: err
        });
    })
}

module.exports.updateConfiguration = (req, res, next) => {

    let data = {
        'userId': 'admin',
        'role': 'admin,user',
        'viewConfig': 1,
        'addConfig': 0,
        'updateConfig': 1,
        'deleteConfig': 1
    }
    userquery.updateTableWithWhere('configurations', `userId='admin' AND role LIKE '%admin%'`, data).then(resp => {
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

module.exports.getConfigurations = (req, res, next) => {

    (async () => {

        let id = req.headers['id'];
        let role = req.headers['role'];
        console.log("userId :", id, ",", "userrole :", role);

        await translate('Hello world', {
            from: 'en',
            to: 'es'
        }).then(res => {
            console.log(res.text);
        }).catch(err => {
            console.error("Error :-", err);
        })

        await userquery.simpleselect('configurations', '*').then(async resp => {
            console.log('response iss:', resp);
            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Get configurations',
                data: resp
            });
        }).catch(err => {
            console.log('Error while getting configurations', err);
            res.status(200).json({
                success: false,
                statusCode: 500,
                message: 'Error while getting configurations',
                data: err
            });
        })
    })();
}