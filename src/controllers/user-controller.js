const userquery = require('../library/userquery.js');

// CRUD Operation API's
module.exports.getUsers = (req, res, next) => {

    userquery.simpleselect('users', '*').then(resp => {
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Date read successfully',
            data: resp
        });
    }).catch(err => {
        res.status(200).send(err);
    })
}

module.exports.addUser = (req, res, next) => {

    userquery.insertTable('users', {
        email: req.body.email,
        password: req.body.password
    }).then(resp => {
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Data inserted successfully',
            data: resp
        });
    }).catch(err => {
        res.status(200).send(err);
    })
}

module.exports.updateUser = (req, res, next) => {

    userquery.updateTable('users', {
        'user_id': req.body.id
    }, {
        'email': req.body.email,
        'password': req.body.password
    }, 'user_id', 'email', 'password').then(resp => {
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Data updated successfully',
            data: resp
        });
    }).catch(err => {
        res.status(200).send(err);
    })
}

module.exports.deleteUser = (req, res, next) => {

    userquery.deleteTable('users', 'user_id', req.body.id).then(resp => {
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Data deleted successfully',
            data: resp
        });
    }).catch(err => {
        res.status(200).send(err);
    })
}


// Join Operation API's
module.exports.getAllData = (req, res, next) => {

    userquery.joinTwoTables('users', 'tasks', 'user_id', 'user_id', ['email', 'title']).then(resp => {
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Data read successfully',
            data: resp
        });
    }).catch(err => {
        res.status(200).send(err);
    })
}

module.exports.getUserorTaskData = (req, res, next) => {

    userquery.joinwithWhereTable('users', 'tasks', 'user_id', 2).then(resp => {
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Data read successfully',
            data: resp
        });
    }).catch(err => {
        res.status(200).send(err);
    })
}

module.exports.getUserandTaskData = (req, res, next) => {

    userquery.innerJoinTable('users', 'tasks', 'user_id', 'user_id').then(resp => {
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Data read successfully',
            data: resp
        });
    }).catch(err => {
        res.status(200).send(err);
    })
}

module.exports.getUserData = (req, res, next) => {

    userquery.leftJoinTable('users', 'tasks', 'user_id', 'user_id').then(resp => {
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Data read successfully',
            data: resp
        });
    }).catch(err => {
        res.status(200).send(err);
    })
}

module.exports.getTaskData = (req, res, next) => {

    userquery.rightJoinTable('users', 'tasks', 'user_id', 'user_id').then(resp => {
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Data read successfully',
            data: resp
        });
    }).catch(err => {
        res.status(200).send(err);
    })
}


// OnClauses Operation API's
module.exports.getDetails = (req, res, next) => {

    userquery.onInTable('users', 'tasks', 'user_id', 'user_id', 1).then(resp => {
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Data read successfully',
            data: resp
        });
    }).catch(err => {
        res.status(200).send(err);
    })
}


// HavingClauses Operation API's
module.exports.getHavingData = (req, res, next) => {

    userquery.havingTable('tasks', 'user_id', 'title', 1).then(resp => {
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Data read successfully',
            data: resp
        });
    }).catch(err => {
        res.status(200).send(err);
    })
}


// Transactiing Operation API's
module.exports.addDataTransaction = (req, res, next) => {

    userquery.transactingTable('users', {
        email: req.body.email,
        password: req.body.password
    }).then(resp => {
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Data inserted successfully',
            data: resp
        });
    }).catch(err => {
        res.status(200).send(err);
    })
}