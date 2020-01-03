const express = require('express');
var router = express.Router();
var connection = require('../config/db.js');
var knex = require('../config/knex.js');
var authCtrl = require('../controllers/auth-controller.js');
var userCtrl = require('../controllers/user-controller.js');
var taskCtrl = require('../controllers/task-controller.js');

router.get('/', (req, res) => {
    console.log("API works!");
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'API works!'
    });
});

router.post('/login', authCtrl.userLogin);

router.post('/signup', authCtrl.userSignup);

router.post('/validateuser', authCtrl.validateUser);

router.post('/forgotpassword', authCtrl.forgotPassword);

router.post('/changepassword', authCtrl.changePassword);

router.post('/uploadProfile', authCtrl.uploadProfile);

router.get('/getUsers', authCtrl.validateLogin, userCtrl.getUsers);

// router.post('/getoneuser', userCtrl.getOneUserById);

router.post('/getuserprofile', userCtrl.getUserProfile);

router.post('/uploadmultiple', authCtrl.uploadMultiple);

router.post('/addUser', authCtrl.validateLogin, userCtrl.addUser);

router.put('/updateUser', authCtrl.validateLogin, userCtrl.updateUser);

router.delete('/deleteUser', authCtrl.validateLogin, userCtrl.deleteUser);

router.get('/getAllData', authCtrl.validateLogin, userCtrl.getAllData);

router.get('/getUserorTaskData', authCtrl.validateLogin, userCtrl.getUserorTaskData);

router.get('/getUserandTaskData', authCtrl.validateLogin, userCtrl.getUserandTaskData);

router.get('/getUserData', authCtrl.validateLogin, userCtrl.getUserData);

router.get('/getTaskData', authCtrl.validateLogin, userCtrl.getTaskData);

router.get('/getDetails', authCtrl.validateLogin, userCtrl.getDetails);

router.get('/getHavingData', authCtrl.validateLogin, userCtrl.getHavingData);

router.post('/postData', authCtrl.validateLogin, userCtrl.addDataTransaction);

router.get('/sp', (req, res, next) => {
    // connection.connect();
    // connection.query(`CREATE PROCEDURE test(id int)
    // BEGIN
    // SELECT * FROM student where user_id = 2 ;
    // END;`, function (err, result, fields) {
    //     if (err) {
    //         console.log("error:", err);
    //         res.status(400).send(err);
    //     } else {
    //         console.dir(result, {depth: null})
    //         res.status(200).json(result);
    //     }
    // });
    // connection.end();

    knex.knex.raw(`CREATE PROCEDURE test_sp(id int)
                BEGIN
                SELECT * FROM users where user_id = 2 ;
                END;`).then(function (result) {
        console.dir(result, {
            depth: null
        });
        res.status(200).json(result);
    });
});

router.get('/getTasks', authCtrl.validateLogin, taskCtrl.getTasks);

// router.get('/getTasks', authCtrl.validateLogin, taskCtrl.getTasksByJoin);

router.get('/getTaskById', authCtrl.validateLogin, taskCtrl.getTaskById);

router.post('/addTask', authCtrl.validateLogin, taskCtrl.addTask);

router.post('/updateTask', authCtrl.validateLogin, taskCtrl.updateTask);

router.post('/updateTaskById', taskCtrl.updateTaskById);

router.post('/deleteTask', authCtrl.validateLogin, taskCtrl.deleteTask);

router.post('/sendnotification', authCtrl.validateLogin, userCtrl.sendNotification);

module.exports = router;