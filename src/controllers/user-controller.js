const knex = require('../config/knex.js');
const db = require('../config/db.js');
const userquery = require('../library/userquery.js');

module.exports.getUsers = (req, res, next) => {

    userquery.simpleselect('users', '*').then(resp => {
        res.status(200).json(resp);
    }).catch(err => {
        res.status(200).send(err);
    })

    // var queryResult = knex.knex('users').where('user_id', req.body.id);

    // db.query(queryResult.toQuery(), (err, result) => {
    //     if (err) {
    //         console.log("err:", err);
    //         res.send(err);
    //     } else {
    //         console.log("result:", result);
    //         res.send(result);
    //     }
    // })
}

module.exports.getTasks = (req, res, next) => {

    userquery.simpleselect('tasks', '*').then(resp => {
        res.status(200).json(resp);
    }).catch(err => {
        res.status(200).send(err);
    })
}