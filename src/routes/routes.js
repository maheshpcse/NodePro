const express = require('express');
var router = express.Router();
var connection = require('../config/db.js');
var knex = require('../config/knex.js');
var authCtrl = require('../controllers/auth-controller.js');
var userCtrl = require('../controllers/user-controller.js');
var taskCtrl = require('../controllers/task-controller.js');
var notifyCtrl = require('../controllers/notifications-controller.js');
var configCtrl = require('../controllers/configurations-controller.js');

// Server routes
router.get('/server', (req, res, next) => {
    console.log("API works!");
    let data = [{
            name: 'Mongodb',
            type: 'Database'
        },
        {
            name: 'Express',
            type: 'Backe-end Framework'
        },
        {
            name: 'Angular',
            type: 'Front-end framework'
        },
        {
            name: 'Node.js',
            type: 'Javascript server'
        }
    ]
    var re = /^[\w+\d+._]+\@[\w+\d+_+]+\.[\w+\d+._]{2,8}$/;
    var re1 = /^([0-9]{6})?$/;
    var email = 'mahesh@email.com';
    var pincode = 517193;
    var body = {};
    body['id'] = 1;
    body['name'] = 'akv';
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'API works!',
        data: data,
        email_validate: re.test(String(email).toLowerCase()),
        pincode_validate: re1.test(Number(pincode))
    });
});

router.post('/login', authCtrl.userLogin);

router.post('/signup', authCtrl.userSignup);

router.post('/validateuser', authCtrl.validateUser);

router.post('/forgotpassword', authCtrl.forgotPassword);

router.post('/changepassword', authCtrl.changePassword);

router.post('/uploadsingle', authCtrl.uploadSingle);

router.post('/uploadmultiple', authCtrl.uploadMultiple);

router.get('/getUsers', authCtrl.validateLogin, userCtrl.getUsers);

// router.post('/getoneuser', userCtrl.getOneUserById);

router.post('/getuserprofile', userCtrl.getUserProfile);

router.post('/getusersprofiles', userCtrl.getUsersProfiles);

router.post('/addUser', userCtrl.addUser);

router.post('/updateUser', authCtrl.validateLogin, userCtrl.updateUser);

router.post('/updateUserById', userCtrl.updateUserById);

router.delete('/deleteUser', authCtrl.validateLogin, userCtrl.deleteUser);

router.get('/getAllData', authCtrl.validateLogin, userCtrl.getAllData);

router.get('/getUserorTaskData', authCtrl.validateLogin, userCtrl.getUserorTaskData);

router.get('/getUserandTaskData', authCtrl.validateLogin, userCtrl.getUserandTaskData);

router.get('/getUserData', authCtrl.validateLogin, userCtrl.getUserData);

router.get('/getTaskData', authCtrl.validateLogin, userCtrl.getTaskData);

router.get('/getDetails', authCtrl.validateLogin, userCtrl.getDetails);

router.get('/getHavingData', authCtrl.validateLogin, userCtrl.getHavingData);

router.post('/postData', authCtrl.validateLogin, userCtrl.addDataTransaction);

router.get('/getTasks', authCtrl.validateLogin, taskCtrl.getTasks);

// router.get('/getTasks', authCtrl.validateLogin, taskCtrl.getTasksByJoin);

router.get('/getTaskById', authCtrl.validateLogin, taskCtrl.getTaskById);

router.post('/addTask', authCtrl.validateLogin, taskCtrl.addTask);

router.post('/updateTask', authCtrl.validateLogin, taskCtrl.updateTask);

router.post('/updateTaskById', taskCtrl.updateTaskById);

router.post('/deleteTask', authCtrl.validateLogin, taskCtrl.deleteTask);

router.post('/sendnotification', authCtrl.validateLogin, userCtrl.sendNotification);

router.get('/getnotifications', authCtrl.validateLogin, notifyCtrl.getNotifications);

// configurations routes

router.post('/addConfiguration', authCtrl.validateLogin, configCtrl.addConfiguration);

router.post('/updateConfiguration', authCtrl.validateLogin, configCtrl.updateConfiguration);

router.get('/getConfigurations', authCtrl.validateLogin, configCtrl.getConfigurations);

module.exports = router;