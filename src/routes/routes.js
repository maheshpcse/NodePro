const express = require('express');
const XlsxPopulate = require('xlsx-populate');
const XLSX = require('xlsx');
var router = express.Router();
var connection = require('../config/db.js');
var knex = require('../config/knex.js');
var cronJob = require('../library/cronJob.js');
var authCtrl = require('../controllers/auth-controller.js');
var userCtrl = require('../controllers/user-controller.js');
var taskCtrl = require('../controllers/task-controller.js');
var notifyCtrl = require('../controllers/notifications-controller.js');
var configCtrl = require('../controllers/configurations-controller.js');

// Server routes
router.get('/server', (req, res, next) => {
    console.log("API works!");
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'API works!'
    });
});

// Download a file
router.post('/download', (req, res, next) => {
    console.log("request data is:", req.body);
    // XlsxPopulate.fromBlankAsync()
    //     .then(workbook => {
    //         workbook.sheet("Sheet1").cell("A1").value("Akrivia Automation PVT LTD").style({
    //             fontColor: "orange",
    //             wrapText: true
    //         })
    //         workbook.toFileAsync("./a.xlsx");
    //     });
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(req.body);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'User tasks');
    XLSX.writeFile(workbook, 'a.xlsx', {Props: 'SheetJs'});
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'File download successful',
        data: req.body
    });
})

// URL for every 5 minuites checking db connection
router.get('/dbconnection', authCtrl.validateLogin, cronJob.checkServerConnection);

router.post('/login', authCtrl.userLogin);

router.post('/signup', authCtrl.userSignup);

router.post('/validateuser', authCtrl.validateUser);

router.post('/forgotpassword', authCtrl.forgotPassword);

router.post('/changepassword', authCtrl.changePassword);

router.post('/uploadsingle', authCtrl.uploadSingle);

router.post('/uploadmultiple', authCtrl.uploadMultiple);

router.post('/logout', authCtrl.userLogout);

router.get('/getUsers', userCtrl.getUsers);

router.post('/updateuserstatus', authCtrl.changeUserStatus);

// router.post('/getoneuser', userCtrl.getOneUserById);

router.post('/getuserprofile', authCtrl.validateLogin, userCtrl.getUserProfile);

router.post('/getusersprofiles', authCtrl.validateLogin, userCtrl.getUsersProfiles);

router.post('/addUser', authCtrl.validateLogin, userCtrl.addUser);

router.post('/updateUser', authCtrl.validateLogin, userCtrl.updateUser);

router.post('/updateUserById', authCtrl.validateLogin, userCtrl.updateUserById);

router.delete('/deleteUser', authCtrl.validateLogin, userCtrl.deleteUser);

router.get('/getAllData', authCtrl.validateLogin, userCtrl.getAllData);

router.get('/getUserorTaskData', authCtrl.validateLogin, userCtrl.getUserorTaskData);

router.get('/getUserandTaskData', authCtrl.validateLogin, userCtrl.getUserandTaskData);

router.get('/getUserData', authCtrl.validateLogin, userCtrl.getUserData);

router.get('/getTaskData', authCtrl.validateLogin, userCtrl.getTaskData);

router.get('/getDetails', authCtrl.validateLogin, userCtrl.getDetails);

router.get('/getHavingData', authCtrl.validateLogin, userCtrl.getHavingData);

router.post('/postData', authCtrl.validateLogin, userCtrl.addDataTransaction);

router.get('/getTasks', taskCtrl.getTasks);

// router.get('/getTasks', authCtrl.validateLogin, taskCtrl.getTasksByJoin);

router.get('/getTaskById', authCtrl.validateLogin, taskCtrl.getTaskById);

router.post('/addTask', taskCtrl.addTask);

router.post('/updateTask', authCtrl.validateLogin, taskCtrl.updateTask);

router.post('/updateTaskById', authCtrl.validateLogin, taskCtrl.updateTaskById);

router.post('/deleteTask', authCtrl.validateLogin, taskCtrl.deleteTask);

router.get('/gettasksbyfilter', taskCtrl.getTasksByFilter);

router.post('/sendNotification', authCtrl.validateLogin, userCtrl.sendNotification);

router.get('/getNotifications', authCtrl.validateLogin, notifyCtrl.getNotifications);

router.post('/tempDeleteNotification', authCtrl.validateLogin, notifyCtrl.tempDeleteNotifications);

router.post('/confirmDeleteNotification', authCtrl.validateLogin, notifyCtrl.confirmDeleleNotifications);

// configurations routes

router.get('/addConfiguration', configCtrl.addConfiguration);

router.post('/updateConfiguration', authCtrl.validateLogin, configCtrl.updateConfiguration);

router.post('/updateConfigurations', configCtrl.updateConfigurations);

router.get('/getConfigurations', configCtrl.getConfigurations);

router.get('/addTaskByTrans', taskCtrl.addTaskByTrans);

module.exports = router;