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

router.post('/validlogin', authCtrl.validateLogin);

router.post('/validateuser', authCtrl.validateUser);

router.post('/changepassword', authCtrl.changePassword);

router.post('/uploadProfile', authCtrl.uploadProfile);

router.get('/getUsers', authCtrl.validateLogin, authCtrl.validateLogin, userCtrl.getUsers);

router.post('/getuserprofile', userCtrl.getOneUserById);

router.post('/addUser', userCtrl.addUser);

router.put('/updateUser', userCtrl.updateUser);

router.delete('/deleteUser', userCtrl.deleteUser);

router.get('/getAllData', userCtrl.getAllData);

router.get('/getUserorTaskData', userCtrl.getUserorTaskData);

router.get('/getUserandTaskData', userCtrl.getUserandTaskData);

router.get('/getUserData', userCtrl.getUserData);

router.get('/getTaskData', userCtrl.getTaskData);

router.get('/getDetails', userCtrl.getDetails);

router.get('/getHavingData', userCtrl.getHavingData);

router.post('/postData', userCtrl.addDataTransaction);

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

router.get('/getTaskById', taskCtrl.getTaskById);

router.post('/addTask', taskCtrl.addTask);

router.post('/updateTask', authCtrl.validateLogin, taskCtrl.updateTask);

router.post('/deleteTask', taskCtrl.deleteTask);

router.post('/sendnotification', userCtrl.sendNotification);

module.exports = router;