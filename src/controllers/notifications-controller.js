var userquery = require('../library/userquery.js');
var rolePrivilege = require('../library/rolePrivilege.js');
var settingsConfig = require('../library/settingsConfig.js');
var Notifications = require('../models/Notifications.js');

// Add Notifications
exports.addNotifications = (data, resp) => {

    userquery.insertTable('notifications', data).then(result => {

        resp = {
            success: true,
            statusCode: 200,
            message: 'Notification sent successful',
            data: result
        };

    }).catch(err => {
        resp = {
            success: false,
            statusCode: 500,
            message: 'Erro while send notification',
            data: err
        };
    })

    return resp;
}

module.exports.getNotifications = (req, res, next) => {

    (async () => {

        let message;

        await rolePrivilege.checkRoleIsFunction(req, 'admin', 'admin').then(async data => {
            console.log("response issssssssss:", data);
            if (data == false) {
                message = await settingsConfig.getErrorMessage('V', 0)
                console.log("message is:", message);
                return res.status(200).json({
                    success: false,
                    statusCode: 500,
                    message: message,
                    data: null
                })
            }

            await userquery.simpleselect('notifications', '*').then(resp => {
                console.log("responses is :", resp);
                res.status(200).json({
                    success: true,
                    statusCode: 200,
                    message: 'Get notifications successful',
                    data: resp
                });
            }).catch(err => {
                console.log("Error while getting notifications", err);
                res.status(200).json({
                    success: false,
                    statusCode: 500,
                    message: 'Error while getting notifications',
                    data: err
                });
            })
        })

    })();
}