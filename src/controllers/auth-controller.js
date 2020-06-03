const dateFormat = require('dateformat');
const jwt = require('jsonwebtoken');
const SessionStorage = require('sessionstorage');
const multer = require('multer');
var userquery = require('../library/userquery.js');
var config = require('../config/config.js');
var users = require('../models/User.js');
var tasks = require('../models/Task.js');
var FormData = require('form-data');
var DIR = './src/uploads/';

// -> Multer Upload Storage
const storage = multer.diskStorage({
    // 
    destination: (req, file, cb) => {
        // cb(null, `${config.file_upload_path.directory}`)
        cb(null, DIR)
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
    }
});

const singleUpload = multer({
    storage: storage
}).single('file');

const multiUpload = multer({
    storage: storage
}).array('files');

// upload Profile API
module.exports.uploadSingle = (req, res, next) => {

    singleUpload(req, res, (err, result) => {
        console.log(req.body);
        console.log(req.file);
        console.log('file extension is:', req.file.originalname.split('.')[1]);
        if (err) {
            console.log("Error while file receiving", err);
            res.status(200).json({
                success: false,
                statusCode: 403,
                message: 'Erro while receiving file',
                data: err
            });
        } else if (!req.file) {
            console.log("No file received");
            res.status(200).json({
                success: false,
                statusCode: 404,
                message: 'No file received'
            });
        } else {
            var username = req.body.username;
            var profileName = req.file.filename;
            var profilePath = "http://192.168.2.146:3333/" + req.file.path;
            console.log("user id is:", username);
            console.log("profile name and path is:", profileName, profilePath);
            userquery.updateTable('users', {
                'username': username
            }, {
                'profilePath': profileName
            }, 'user_id', 'profilePath').then(resp => {
                console.log('Profile upload successful');
                res.status(200).json({
                    success: true,
                    statusCode: 200,
                    message: 'Profile upload successful',
                    data: resp
                });
            }).catch(err => {
                console.log("Error while profile upload", err);
                res.status(200).json({
                    success: false,
                    statusCode: 500,
                    message: 'Error while profile upload',
                    data: err
                });
            })
            // res.status(200).json({
            //     success: true,
            //     statusCode: 200,
            //     message: 'Profile upload successful',
            //     data: result
            // });
        }
    })
}

module.exports.uploadMultiple = (req, res, next) => {

    multiUpload(req, res, function (err, result) {
        console.log(req.body);
        console.log(req.files);
        if (err) {
            console.log("Error while files receiving", err);
            res.status(200).json({
                success: false,
                message: 'Error while files receiving',
                data: err
            });
        } else if (!req.files) {
            console.log("No files received");
            res.status(200).json({
                success: false,
                message: 'No files received'
            });
        } else {
            var username = req.body.username;
            console.log("username is:", username);
            var profileNames = [];
            for (let i = 0; i < req.files.length; i++) {
                profileNames.push(req.files[i].filename);
            }
            let fileNamesArr = profileNames.join();
            console.log("profileNames arr is: ", fileNamesArr);
            userquery.updateTable('users', {
                'username': username
            }, {
                'uploadProfiles': fileNamesArr
            }, 'user_id', 'profilePath').then(resp => {
                console.log('Profile upload successful');
                res.status(200).json({
                    success: true,
                    statusCode: 200,
                    message: 'Files saved successful',
                    data: resp
                });
            }).catch(err => {
                console.log("Error while files saved", err);
                res.status(200).json({
                    success: false,
                    statusCode: 500,
                    message: 'Error while files saved',
                    data: err
                });
            })
            // res.status(200).json({
            //     success: true,
            //     statusCode: 200,
            //     message: 'Files saved successful',
            //     data: result
            // });
        }
    })
}

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

    (async () => {
        await userquery.simpleselect('users', '*', wherecond).then( async result => {
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
            if(result[0].configure == 'Blocked') {
                console.log("User is blocked");
                return res.status(200).json({
                    success: false,
                    statusCode: 405,
                    message: 'User is blocked',
                    data: null
                });
            }
            await userquery.updateTableWithWhere('users', `user_id=${result[0].user_id}`, { status: 'Active' }).then(resp => {
                console.log("Login successful", resp);
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
                    token: token,
                    id: result[0].username,
                    role: result[0].role,
                    firstname: result[0].firstname,
                    lastname: result[0].lastname,
                    password: result[0].password,
                    phonenumber: result[0].phonenumber,
                    designation: result[0].designation,
                    department: result[0].department,
                    created_at: result[0].created_at
                });
            }).catch(err=> {
                console.log("Error while activate user", err);
                res.status(200).json({
                    success: false,
                    statusCode: 500,
                    message: 'Error while activate user',
                    data: err
                });
            })
        }).catch(err => {
            console.log("Error while login", err);
            res.status(200).json({
                success: false,
                statusCode: 500,
                message: 'Error while login',
                data: err
            });
        })
    })();
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

    // console.log(req.headers);
    let token = req.headers['x-access-token'] || req.headers['authorization'].split(',')[0];
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
                // console.log("decoded data", req.decoded);
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

// Forgot Password API
module.exports.forgotPassword = (req, res, next) => {

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

// Change Password API
module.exports.changePassword = (req, res, next) => {

    let columndata = {
        user_id: req.body.user_id,
        password: req.body.password
    }
    userquery.updateTableWithWhere('users', `user_id=${req.body.user_id}`, columndata).then(resp => {
        if (resp == '' || resp == []) {
            console.log("Invalid username or pasword");
            return res.status(200).json({
                success: false,
                statusCode: 404,
                message: 'Invalid username or password',
                data: null
            });
        }
        console.log("Password updated successful");
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Password updated successful',
            data: resp
        });
    }).catch(err => {
        console.log("Error while changing password", err);
        res.status(200).json({
            success: false,
            statusCode: 500,
            message: 'Error while changing password',
            data: err
        });
    })
}

// Change Username API
module.exports.changeUsername = (req, res, next) => {

    console.log(req.body);
    
    userquery.updateTableWithWhere('users', `user_id=${req.body.user_id}`, req.body).then(resp => {
        console.log('Username changed successful');
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Username changed successful',
            data: resp
        });
    }).catch(err => {
        console.log('Error while updating username', err);
        res.status(200).json({
            success: false,
            statusCode: 500,
            message: 'Error while updating username',
            data: null
        });
    })
}

// Block or unbloce user api
module.exports.changeUserStatus = (req, res, next) => {

    console.log(req.body);
    
    userquery.updateTableWithWhere('users', `user_id=${req.body.user_id}`, req.body).then(resp => {
        console.log('User status changed successful');
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'User status changed successful',
            data: resp
        });
    }).catch(err => {
        console.log('Error while updating user status', err);
        res.status(200).json({
            success: false,
            statusCode: 500,
            message: 'Error while updating user status',
            data: null
        });
    })
}

// User sign out api
module.exports.userLogout = (req, res, next) => {

    userquery.updateTableWithWhere('users', `user_id=${req.body.user_id}`, { status: 'Inactive' }).then(resp => {
        console.log('User signout successful');
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'User signout successful',
            data: resp
        });
    }).catch(err => {
        console.log('Error while signout user', err);
        res.status(200).json({
            success: false,
            statusCode: 500,
            message: 'Error while signout user',
            data: null
        });
    })
}

module.exports.oauthVerification = (req, res, next) => {

}