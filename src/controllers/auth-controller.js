const dateFormat = require('dateformat');
const jwt = require('jsonwebtoken');
var userquery = require('../library/userquery.js');
var config = require('../config/config.js');
var users = require('../models/User.js');

// user Login API
module.exports.userLogin = (req, res, next) => {

    console.log("request fields are:", req.body);
    
    if (!req.body.username || !req.body.password) {
        return res.status(200).json({
            success: false,
            statusCode: 204,
            message: 'Required fields are empty, Please check once',
            data: null
        });
    }

    let wherecond = `username='${req.body.username}' AND password='${req.body.password}'`;

    userquery.simpleselect('users', '*', wherecond).then(result => {
        console.log("response is:", result);
        if(result == '' || result == null) {
            console.log("Invalid username or password");
            return res.status(200).json({
                success: false,
                statusCode: 404,
                message: 'Invalid username or password',
                data: result
            });
        }
        console.log("Login successful");
        var token = jwt.sign({
            id: result[0].username
        }, config.database.securitykey, {
            expiresIn: 3600
        })
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Login successful',
            data: result,
            id: result[0].username,
            role: result[0].role,
            token: token
        });
    }).catch(err => {
        console.log("Error while login", err);
        res.status(200).json({
            success: false,
            statusCode: 500,
            message: 'Error while login',
            data: err
        });
    })
}