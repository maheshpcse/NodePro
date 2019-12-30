const dateFormat = require('dateformat');
const jwt = require('jsonwebtoken');
const SessionStorage = require('sessionstorage');
const multer = require('multer');
var userquery = require('../library/userquery.js');
var config = require('../config/config.js');
var users = require('../models/User.js');
var tasks = require('../models/Task.js');

// -> Multer Upload Storage
const storage = multer.diskStorage({
    // 
    destination: (req, file, cb) => {
        cb(null, __dirname + `${config.file_upload_path.directory}`)
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
    }
});

const upload = multer({
    storage: storage
}).single('file');


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
        // console.log("response is:", result);
        if (result == '' || result == null || result == []) {
            console.log("Invalid username or password");
            return res.status(200).json({
                success: false,
                statusCode: 404,
                message: 'Invalid username or password',
                data: null
            });
        }
        console.log("Login successful");
        var token = jwt.sign({
            id: result[0].username
        }, config.database.securitykey, {
            expiresIn: '24h'
        });
        console.log("token is:", token);
        SessionStorage.setItem('token', token);
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

// user Signup API
module.exports.userSignup = (req, res, next) => {

    console.log("request fields are:", req.body);

    let columndata = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        phonenumber: req.body.phonenumber,
        role: req.body.role,
        created_at: new Date(),
        updated_at: new Date()
    }

    userquery.insertTable('users', columndata).then(resp => {
        console.log("response is:", resp);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Signup successful',
            data: resp
        });
        console.log("Signup successful");
    }).catch(err => {
        console.log("Signup failed", err);
        res.status(500).send(err);
    })
}

// checking valid Login API
module.exports.validateLogin = (req, res, next) => {

    // let token = SessionStorage.getItem('token');
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    // console.log("token is:", token);

    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }
    if (token) {
        jwt.verify(token, config.database.securitykey, (err, decoded) => {
            if (err) {
                return res.status(200).json({
                    success: false,
                    message: 'Token is not valid'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(200).json({
            success: false,
            message: 'Auth token is not supplied'
        });
    }
}

// checking validate User For Change Password API
module.exports.validateUser = (req, res, next) => {

    userquery.simpleselect('users', 'user_id', `username = '${req.body.username}'`).then(resp => {
        console.log("result is:", resp);
        if (resp == '' || resp == []) {
            console.log("Invalid username");
            return res.status(200).json({
                success: false,
                statusCode: 404,
                message: 'Invalid username',
                data: null
            });
        }
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Valid username',
            data: resp
        });
    }).catch(err => {
        console.log("Error while validate username", err);
        res.status(200).json({
            success: false,
            statusCode: 500,
            message: 'Error while validate username',
            data: err
        });
    })
}

// change Password API
module.exports.changePassword = (req, res, next) => {

    userquery.updateTable('users', {
        'user_id': req.body.user_id
    }, {
        'password': req.body.password
    }, 'user_id', 'password').then(resp => {
        console.log("Password changed successful");
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Password changed successful',
            data: resp
        });
    }).catch(err => {
        console.log("Error while change password", err);
        res.status(200).json({
            success: false,
            statusCode: 500,
            message: 'Error while change password',
            data: err
        });
    })
}

// upload Profile API
module.exports.uploadProfile = (req, res, next) => {

    upload(req, res, (err, result) => {
        if (err) {
            console.log("Error while file receiving", err);
        } else if (!req.file.path) {
            console.log("No file received");
        } else {
            var profilePath = req.file.path;
            var user_id = req.body.id;
            console.log("user id is:", user_id);
            userquery.updateTable('users', {
                'user_id': user_id
            }, {
                'profilePath': profilePath
            }, 'user_id', 'profilePath').then(resp => {
                console.log('Profile upload successful');
                res.status(200).json({
                    success: true,
                    statusCode: 200,
                    message: 'Profile upload successful',
                    data: resp
                });
            }).catch(err => {
                console.log("Error while file upload", err);
                res.status(200).send(err);
            })
        }
    })
}