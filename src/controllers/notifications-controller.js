var userquery = require('../library/userquery.js');
var rolePrivilege = require('../library/rolePrivilege.js');
var settingsConfig = require('../library/settingsConfig.js');
var Notifications = require('../models/Notifications.js');

// add Notifications

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

// get all notifications

module.exports.getNotifications = (req, res, next) => {

    (async () => {

        let message;
        let notificationCount;

        await rolePrivilege.checkRoleIsHaving(req, 'user', 'user', 1).then(async data => {
            console.log("response issssssssss:", data);
            if (data == false) {
                message = await settingsConfig.getErrorMessage('V', 0)
                console.log("message is:", message);
                return res.status(200).json({
                    success: false,
                    statusCode: 500,
                    message: message,
                    data: null
                });
            }
            await userquery.simpleselect('notifications', '*').then(resp => {
                console.log("responses is :", resp);
                notificationCount = resp.length ? resp.length : 0;
                res.status(200).json({
                    success: true,
                    statusCode: 200,
                    message: 'Get notifications successful',
                    data: resp,
                    count: notificationCount
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

// deactivate or restore a notifications temperarly based on status and id,
// if status = 1, delete or status = 0, restore the notifications.

module.exports.tempDeleteNotifications = (req, res, next) => {

    (async () => {

        let status = 1;
        let message = '';

        await rolePrivilege.checkRoleIsHaving(req, 'user', 'user', 3).then(async data => {
            if (data == false) {
                let message = await settingsConfig.getErrorMessage('D', status)
                return res.status(200).json({
                    success: false,
                    statusCode: 500,
                    message: message,
                    data: null
                });
            }
            await userquery.updateTableWithWhere('notifications', `notify_id = 1`, {
                'status': status
            }).then(resp => {
                if (status == 1) {
                    message = 'Notification deleted';
                    console.log("Notification deleted", resp);
                } else {
                    message = 'Notification restored';
                    console.log("Notification restored", resp);
                }
                res.status(200).json({
                    success: true,
                    statusCode: 200,
                    message: message,
                    data: resp
                });
            }).catch(err => {
                console.log("Error while delete/restore notification", err);
                res.status(200).json({
                    success: false,
                    statusCode: 500,
                    message: "Error while delete/restore notification",
                    data: err
                });
            })
        })
    })();
}

// delete notification perminantly based on status and id

module.exports.confirmDeleleNotifications = (req, res, next) => {

    (async () => {

        await rolePrivilege.checkRoleIsHaving(req, 'user', 'user', 3).then(async data => {
            if (!data) {
                let message = await settingsConfig.getErrorMessage('D', 1)
                return res.status(200).json({
                    success: false,
                    statusCode: 500,
                    message: message,
                    data: null
                });
            }
            await userquery.deleteTable('notifications', 'notify_id', 1).then(resp => {
                console.log('Notification deleted perminantly', resp);
                res.status(200).json({
                    success: true,
                    statusCode: 200,
                    message: 'Notification deleted perminantly',
                    data: resp
                });
            }).catch(err => {
                console.log("Error while deleting notification", err);
                res.status(200).json({
                    success: false,
                    statusCode: 500,
                    message: 'Error while deleting notification',
                    data: err
                });
            })
        })
    })();
}