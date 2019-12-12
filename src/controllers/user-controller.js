const userquery = require('../library/userquery.js');

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