require('dotenv').config();
var userquery = require('../library/userquery.js');
var configurations = require('../models/Configurations.js');
const translate = require('google-translate-api');

// Configuration api's

module.exports.addConfiguration = (req, res, next) => {

    let data = [
        {
            config_name: 'Task Info',
            userId: 'user',
            role: 'user',
            viewConfig: 1,
            addConfig: 0,
            updateConfig: 0,
            deleteConfig: 0,
            status: 'Active',
            created_at: new Date(),
            updated_at: new Date()
        }
    ]
    userquery.insertTable('configurations', req.body).then(resp => {
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

module.exports.updateConfigurations = (req, res, next) => {

    userquery.insertOrUpdate(configurations, req.body).then(resp => {
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

        // let id = req.headers['id'];
        // let role = req.headers['role'];
        // console.log("userId :", id, ",", "userrole :", role);

        // let translateText;

        // await translate('Hello world', {
        //     from: 'en',
        //     to: 'es'
        // }).then(res => {
        //     console.log(res.text);
        //     translateText = res.text;
        // }).catch(err => {
        //     console.error("Error :-", err);
        // })

        await userquery.simpleselect('configurations', '*').then(async resp => {
            // console.log('Module configurations:', resp);
            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Get configurations',
                data: resp
            });
        }).catch(err => {
            // console.log('Error while getting module configurations', err);
            res.status(200).json({
                success: false,
                statusCode: 500,
                message: 'Error while getting module configurations',
                data: err
            });
        })
    })();
}