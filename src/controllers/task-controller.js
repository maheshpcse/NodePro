const { transaction } = require('objection');
var knex = require('../config/knex.js');
var userquery = require('../library/userquery.js');
var tasks = require('../models/Task.js');

module.exports.getTasks = (req, res, next) => {

    (async () => {
        var offset = 0;
        var limit = 5;
        console.log(req.query);
        if (req.query && req.query.offset && req.query.limit) {
            offset = parseInt(req.query.offset, 10);
            limit = parseInt(req.query.limit, 10);
        }
        await userquery.filterTable('tasks', '*', limit, offset).then(async resp => {

            console.log("response is:", resp);

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
                        firstname: result[pos].firstname,
                        lastname: result[pos].lastname,
                        email: result[pos].email,
                        password: result[pos].password,
                        phonenumber: result[pos].phonenumber,
                        role: result[pos].role,
                        assigned_roles: result[pos].assigned_roles,
                        designation: result[pos].designation,
                        department: result[pos].department,
                        profilePath: result[pos].profilePath,
                        status: result[pos].status,
                        configure: result[pos].configure,
                        created_on: result[pos].created_at,
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

    // console.log("request body is", req.body);

    // req.body.created_at = new Date(req.body.date)

    // let columndata = {
    //     'title': req.body.title,
    //     'description': req.body.description,
    //     'is_complete': req.body.is_complete,
    //     'user_id': req.body.user_id,
    //     'created_at': new Date(),
    //     'updated_at': new Date()
    // }

    userquery.insertTable('tasks', req.body).then(resp => {
        // console.log("Task inserted successful");
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Task inserted successful',
            data: resp
        });
    }).catch(err => {
        // console.log("Error while inserting task", err);
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

module.exports.updateTaskById = (req, res, next) => {

    userquery.updateTableWithWhere('tasks', `task_id=${req.body.task_id}`, req.body).then(resp => {
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


// Transaction starts
// Passing around a transaction object
module.exports.addTaskByTrans = (req, res, next) => {

    (async () => {

        try {
            const task = await knex.knex.transaction(async trx => {
                const work = await tasks.query(trx).insert({
                    title: 'searching',
                    description: 'living purpose',
                    is_complete: 0,
                    user_id: 6
                });
                task = await work.$relatedQuery('tasks', trx).insert({
                    title: 'learning',
                    description: 'car and bike driving',
                    is_complete: 0,
                    user_id: 6
                });
                return task;
            });
            console.log("Both task and work is inserted");
            return res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Both task and work is inserted'
            });
        } catch (error) {
            console.log('Something went wrong!, Neither task nor work is inserted', error);
            return res.status(200).json({
                success: false,
                statusCode: 500,
                message: 'Something went wrong!, Neither task nor work is inserted',
                data: null
            });
        }
        
    })();
}

// GET user tasks by Filter
module.exports.getTasksByFilter = (req, res, next) => {

    (async () => {
        var offset = 0;
        var limit = 0;
        console.log(req.query);
        if (req.query && req.query.offset && req.query.limit) {
            offset = parseInt(req.query.offset, 10);
            limit = parseInt(req.query.limit, 10);
        }
        await userquery.filterTable('tasks', '*', limit, offset).then(resp=>{
            console.log("Task filtering successful");
            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Task filtering successful',
                data: resp
            });
        }).catch(err => {
            console.log("Error while filtering tasks", err);
            res.status(200).send(err);
        })
    })();
}