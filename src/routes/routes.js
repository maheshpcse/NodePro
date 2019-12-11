const express = require('express');
var router = express.Router();
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

router.get('/users', userCtrl.getUsers);

router.post('/adduser', userCtrl.addUser);

router.delete('/deleteuser', userCtrl.deleteUser);

router.get('/tasks', taskCtrl.getTasks);

module.exports = router;