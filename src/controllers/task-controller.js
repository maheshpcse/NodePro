const userquery = require('../library/userquery.js');
var tasks = require('../models/Task.js');

module.exports.getTasks = (req, res, next) => {

    (async () => {
        await userquery.simpleselect('tasks', '*').then(async resp => {

            // console.log("response is:", resp);

            await userquery.simpleselect('users', '*').then(result => {

                let tasksArr = [];
                let arr = [];
                for (let i = 0; i < result.length; i++) {
                    arr.push(result[i].user_id);
                }
                for (let i = 0; i < resp.length; i++) {
                    var pos = arr.indexOf(resp[i].user_id);
                    // console.log("position is:", pos);
                    // console.log("username is:", result[pos].username);
                    let obj = {
                        task_id: resp[i].task_id,
                        title: resp[i].title,
                        description: resp[i].description,
                        is_complete: resp[i].is_complete,
                        user_id: resp[i].user_id,
                        username: result[pos].username,
                        created_at: resp[i].created_at,
                        updated_at: resp[i].updated_at
                    }
                    tasksArr.push(obj);
                }
                // console.log("tasks data is:", tasksArr);
                res.status(200).json({
                    success: true,
                    statusCode: 200,
                    message: 'Date read successfully',
                    data: tasksArr
                });
            }).catch(err => {
                console.log("Error while getting users", err);
                res.status(200).send(err);
            })
        }).catch(err => {
            console.log("Error while getting tasks", err);
            res.status(200).send(err);
        })
    })();
}

module.exports.getTasksByJoin = (req, res, next) => {

    userquery.innerJoinTable('tasks', 'users', 'user_id', 'user_id').then(resp => {
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Task read successful',
            data: resp
        });
    }).catch(err => {
        res.status(200).send(err);
    })
}

module.exports.getTaskById = (req, res, next) => {

    userquery.simpleselect('tasks', '*', `task_id=${req.body.task_id}`).then(resp => {
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Task By Id read successful',
            data: resp
        });
    }).catch(err => {
        res.status(200).send(err);
    })
}

module.exports.addTask = (req, res, next) => {

    console.log("request body is", req.body);
    
    // let columndata = {
    //     'title': req.body.title,
    //     'description': req.body.description,
    //     'is_complete': req.body.is_complete,
    //     'user_id': req.body.user_id,
    //     'created_at': new Date(),
    //     'updated_at': new Date()
    // }

    userquery.insertTable('tasks', req.body).then(resp => {
        console.log("Task inserted successful");
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Task inserted successful',
            data: resp
        });
    }).catch(err => {
        console.log("Error while inserting task", err);
        res.status(200).send(err);
    })
}

module.exports.updateTask = (req, res, next) => {

    console.log("request is:", req.body);

    let columndata = {
        'title': req.body.title,
        'description': req.body.description,
        'is_complete': req.body.is_complete,
        'user_id': req.body.user_id,
        'created_at': new Date(),
        'updated_at': new Date()
    }

    userquery.updateTable('tasks', {
        'task_id': req.body.task_id
    }, columndata, 'task_id', 'title', 'description', 'is_complete', 'user_id', 'created_at', 'updated_at').then(resp => {
        console.log('Task updated successful');
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Task updated successful',
            data: resp
        });
    }).catch(err => {
        console.log('Error while updating task', err);
        res.status(200).send(err);
    })
}

module.exports.deleteTask = (req, res, next) => {

    console.log("request body is:", req.body);

    userquery.deleteTable('tasks', 'task_id', req.body.task_id).then(resp => {
        console.log("Task deleted successful");
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Task deleted successful',
            data: resp
        });
    }).catch(err => {
        console.log("Error while deleting task", err);
        res.status(200).send(err);
    })
}