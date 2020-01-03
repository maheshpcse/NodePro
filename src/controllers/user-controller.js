const userquery = require('../library/userquery.js');
var User = require('../models/User.js');
var notifications = require('../controllers/notifications-controller.js');
var config = require('../config/config.js');
var DIR = './src/uploads';
const fs = require('fs');
const path = require('path');
const image2base64 = require('image-to-base64');
const base64 = require('node-base64-image');
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
        let filename = `${resp[0].profilePath}`;
        console.log("filename is:", filename);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'User data read successfully',
            data: resp,
            file: filename
        });
    }).catch(err => {
        res.status(200).send(err);
    })
}

module.exports.getUserProfile = (req, res, next) => {

    // console.log("request is", req.body);

    userquery.simpleselect('users', '*', `username='${req.body.username}'`).then(resp => {
        // var originalImage = fs.readFileSync(__dirname + `../../../${DIR}/${resp[0].profilePath}`);
        // console.log("originalImage is:", originalImage);
        // var base64Image = new Buffer(originalImage).toString('base64');
        // console.log("base64Image is:", base64Image);
        var base64Image;
        var Imagepath = path.join(__dirname + `../../../${DIR}/${resp[0].profilePath}`);
        console.log("Image path is:", Imagepath);
        var options = {
            string: true,
            local: true
        };
        base64.encode(Imagepath, options, (err, image) => {
            if (err) {
                console.log("error converting base64 format", err);
            } else {
                base64Image = image;
                // console.log("base64 Image is:", base64Image);
                res.status(200).json({
                    success: true,
                    statusCode: 200,
                    message: 'User data read successfully',
                    data: resp,
                    file: base64Image
                });
            }
        });
    }).catch(err => {
        console.log("error while getting user data:", err);
        res.status(200).json({
            data: err
        });
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

module.exports.updateUserById = (req, res, next) => {

    userquery.updateTableWithWhere('users', `user_id=${req.body.user_id}`, req.body).then(resp => {
        console.log("User details updated successful");
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'User details updated successful',
            data: resp
        });
    }).catch(err => {
        console.log("Error while updating user details");
        res.status(200).json({
            success: false,
            statusCode: 500,
            message: 'Error while updating user details',
            data: err
        });
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

            console.log("notification result is:", result);

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