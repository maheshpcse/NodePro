const userquery = require('../library/userquery.js');
const Notifications = require('../models/Notifications.js');

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