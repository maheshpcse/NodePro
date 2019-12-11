const userquery = require('../library/userquery.js');

module.exports.getTasks = (req, res, next) => {

    userquery.simpleselect('tasks', '*').then(resp => {
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