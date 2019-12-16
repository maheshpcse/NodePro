const express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/user-controller.js');
var taskCtrl = require('../controllers/task-controller.js');
var connection = require('../config/db.js');
var knex = require('../config/knex.js');

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
        console.dir(result, {depth: null});
        res.status(200).json(result);
    });
})


router.get('/getAllData', userCtrl.getAllData)

router.get('/getUserorTaskData', userCtrl.getUserorTaskData)

router.get('/getUserandTaskData', userCtrl.getUserandTaskData)

router.get('/getUserData', userCtrl.getUserData)

router.get('/getTaskData', userCtrl.getTaskData)

router.get('/getDetails', userCtrl.getDetails)

router.get('/getHavingData', userCtrl.getHavingData)

router.post('/postData', userCtrl.addDataTransaction)

module.exports = router;