const { transaction } = require('objection');
var knex = require('../config/knex.js');
var userquery = require('../library/userquery.js');

// GET Project list API
module.exports.getProjects = (req, res, next) => {

    userquery.simpleselect('projects', '*').then(resp => {
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Get project list',
            data: resp
        });
    }).catch(err => {
        res.status(200).send(err);
    })
}

// ADD Project API
module.exports.addProject = (req, res, next) => {

    console.log(req.body);

    userquery.insertTable('projects', req.body).then(resp => {
        console.log('Project added successfully', resp);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Project added successfully',
            data: resp
        });
    }).catch(err => {
        console.log('Unable to add project');
        res.status(200).json({
            success: true,
            statusCode: 500,
            message: 'Unable to add project',
            data: null
        });
    })
}