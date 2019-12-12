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

router.get('/getUsers', userCtrl.getUsers);

router.post('/addUser', userCtrl.addUser);

router.put('/updateUser', userCtrl.updateUser);

router.delete('/deleteUser', userCtrl.deleteUser);

router.get('/getTasks', taskCtrl.getTasks);

module.exports = router;