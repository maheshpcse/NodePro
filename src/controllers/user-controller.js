const userquery = require('../library/userquery.js');
var User = require('../models/User.js');
var notifications = require('../controllers/notifications-controller.js');

// CRUD Operation API's
module.exports.getUsers = (req, res, next) => {

    userquery.simpleselect('users', '*').then(resp => {
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'User data read successfully',
            data: resp
        });
    }).catch(err => {
        res.status(200).send(err);
    })
}

module.exports.getOneUserById = (req, res, next) => {

    // console.log("request is", req.body);

    userquery.simpleselect('users', '*', `username='${req.body.username}'`).then(resp => {
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'User data read successfully',
            data: resp
        });
    }).catch(err => {
        res.status(200).send(err);
    })
}

module.exports.addUser = (req, res, next) => {

    userquery.insertTable('users', {
        'firstname': req.body.firstname,
        'lastname': req.body.lastname,
        'username': req.body.username,
        'email': req.body.email,
        'password': req.body.password,
        'phonenumber': req.body.phonenumber,
        'designation': req.body.designation,
        'department': req.body.department,
        'created_at': new Date(),
        'updated_at': new Date()
    }).then(resp => {
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Data inserted successfully',
            data: resp
        });
    }).catch(err => {
        res.status(200).send(err);
    })
}

module.exports.updateUser = (req, res, next) => {

    userquery.updateTable('users', {
        'user_id': req.body.id
    }, {
        'firstname': req.body.firstname,
        'lastname': req.body.lastname,
        'username': req.body.username,
        'email': req.body.email,
        'password': req.body.password,
        'phonenumber': req.body.phonenumber,
        'designation': req.body.designation,
        'department': req.body.department,
        'created_at': new Date(),
        'updated_at': new Date()
    }, 'user_id', 'firstname', 'lastname', 'username', 'email', 'password', 'phonenumber', 'designation', 'department', 'created_at', 'updated_at').then(resp => {
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Data updated successfully',
            data: resp
        });
    }).catch(err => {
        res.status(200).send(err);
    })
}

module.exports.deleteUser = (req, res, next) => {

    userquery.deleteTable('users', 'user_id', req.body.id).then(resp => {
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Data deleted successfully',
            data: resp
        });
    }).catch(err => {
        res.status(200).send(err);
    })
}


// Join Operation API's
module.exports.getAllData = (req, res, next) => {

    userquery.joinTwoTables('users', 'tasks', 'user_id', 'user_id', ['email', 'title']).then(resp => {
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Data read successfully',
            data: resp
        });
    }).catch(err => {
        res.status(200).send(err);
    })
}

module.exports.getUserorTaskData = (req, res, next) => {

    userquery.joinwithWhereTable('users', 'tasks', 'user_id', 2).then(resp => {
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Data read successfully',
            data: resp
        });
    }).catch(err => {
        res.status(200).send(err);
    })
}

module.exports.getUserandTaskData = (req, res, next) => {

    userquery.innerJoinTable('users', 'tasks', 'user_id', 'user_id').then(resp => {
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Data read successfully',
            data: resp
        });
    }).catch(err => {
        res.status(200).send(err);
    })
}

module.exports.getUserData = (req, res, next) => {

    userquery.leftJoinTable('users', 'tasks', 'user_id', 'user_id').then(resp => {
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Data read successfully',
            data: resp
        });
    }).catch(err => {
        res.status(200).send(err);
    })
}

module.exports.getTaskData = (req, res, next) => {

    userquery.rightJoinTable('users', 'tasks', 'user_id', 'user_id').then(resp => {
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Data read successfully',
            data: resp
        });
    }).catch(err => {
        res.status(200).send(err);
    })
}


// OnClauses Operation API's
module.exports.getDetails = (req, res, next) => {

    userquery.onInTable('users', 'tasks', 'user_id', 'user_id', 1).then(resp => {
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Data read successfully',
            data: resp
        });
    }).catch(err => {
        res.status(200).send(err);
    })
}


// HavingClauses Operation API's
module.exports.getHavingData = (req, res, next) => {

    userquery.havingTable('tasks', 'user_id', 'title', 1).then(resp => {
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Data read successfully',
            data: resp
        });
    }).catch(err => {
        res.status(200).send(err);
    })
}


// Transactiing Operation API's
module.exports.addDataTransaction = (req, res, next) => {

    userquery.transactingTable('users', {
        email: req.body.email,
        password: req.body.password,
        created_at: new Date(),
        updated_at: new Date()
    }).then(resp => {
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Data inserted successfully',
            data: resp
        });
    }).catch(err => {
        console.log("error:", err);
        res.status(200).send(err);
    })
}

// Send Message To User
module.exports.sendNotification = (req, res, next) => {

    console.log("request is:", req.body);

    (async () => {
        let notifyData = {
            'notification': req.body.notification,
            'type_of_notify': req.body.type_of_notify,
            'module_name': req.body.module_name,
            'sender_name': req.body.sender_name,
            'receiver_name': req.body.receiver_name,
            'status': req.body.status,
            'user_id': req.body.user_id,
            'created_at': new Date(),
            'updated_at': new Date()
        }
        await userquery.insertTable('notifications', notifyData).then(async result => {

            // res.status(200).json({
            //     success: true,
            //     statusCode: 200,
            //     message: 'Notification sent successful',
            //     data: result
            // });

            await userquery.simpleselect('notifications', '*').then(resp => {
                res.status(200).json({
                    success: true,
                    statusCode: 200,
                    message: 'Notification sent successful',
                    data: resp
                });
            }).catch(err => {
                res.status(200).send(err);
            })

        }).catch(err => {
            res.status(200).json({
                success: false,
                statusCode: 500,
                message: 'Erro while send notification',
                data: err
            });
        })
    })();
}