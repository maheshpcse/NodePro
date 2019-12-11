const express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/user-controller.js');

router.get('/', (req, res) => {
    console.log("API works!");
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'API works!'
    });
});

router.get('/users', userCtrl.getUsers);

router.get('/tasks', userCtrl.getTasks);

module.exports = router;