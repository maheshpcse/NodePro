var userquery = require('../library/userquery.js');
var User = require('../models/User.js');
var notifications = require('../controllers/notifications-controller.js');
var config = require('../config/config.js');
var DIR = './src/uploads';
const fs = require('fs');
const path = require('path');
const image2base64 = require('image-to-base64');
const base64 = require('node-base64-image');
const readXlsxFile = require('read-excel-file');
var fileUpload = require('../controllers/auth-controller.js');
const XLSX = require('xlsx');
const PdfReader = require('pdfreader');
const pdf = require('pdf-parse');
const WordExtractor = require("word-extractor");
const textract = require('textract');

// CRUD Operation API's
module.exports.getUsers = (req, res, next) => {

    userquery.simpleselect('users', '*').then(resp => {
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'User data read successfully',
            data: resp
        });
    }).catch(err => {
        res.status(200).send(err);
    })
}

module.exports.getOneUserById = (req, res, next) => {

    console.log("request is", req.body);

    userquery.simpleselect('users', '*', `username='${req.body.username}'`).then(resp => {
        let filename = `${resp[0].profilePath}`;
        console.log("filename is:", filename);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'User data read successfully',
            data: resp,
            file: filename
        });
    }).catch(err => {
        res.status(200).send(err);
    })
}

module.exports.getUserProfile = (req, res, next) => {

    // console.log("request body id:", req.body);
    
    userquery.simpleselect('users', '*', `username='${req.body.username}'`).then(resp => {
        // console.log("file extension is:", resp[0].profilePath.split('.')[1]);
        var filePath = path.join(__dirname + `../../../${DIR}/${resp[0].profilePath}`);
        var extName = resp[0].profilePath.split('.')[1];
        if (extName == 'docx') {
            textract.fromFileWithPath(filePath, function (error, text) {
                if (error) throw err;
                console.log('docx text is:', text);
                res.status(200).json({
                    success: true,
                    statusCode: 200,
                    message: 'Docx file read success',
                    data: resp,
                    file: text,
                    ext: extName
                });
            });
        } else if (extName == 'doc') {
            var extractor = new WordExtractor();
            var extracted = extractor.extract(filePath);
            extracted.then(function (doc) {
                console.log(doc.getBody());
                res.status(200).json({
                    success: true,
                    statusCode: 200,
                    message: 'Doc file read success',
                    data: resp,
                    file: doc.getBody(),
                    ext: extName
                });
            });
        } else if (extName == 'txt' || extName == 'TXT') {
            console.log("Text file path is:", filePath);
            fs.readFile(filePath, {
                encoding: 'utf-8'
            }, function (err, data) {
                if (!err) {
                    // console.log('received data: ' + data);
                    res.status(200).json({
                        success: true,
                        statusCode: 200,
                        message: 'Text file read success',
                        data: resp,
                        file: data,
                        ext: extName
                    });
                } else {
                    console.log('Error while read text file', err);
                    return res.status(200).json({
                        success: true,
                        statusCode: 200,
                        message: 'Error while read text file',
                        data: err
                    });
                }
            });
        } else if (extName == 'xlsx' || extName == 'xls' || extName == 'XLSX' || extName == 'XLS') {
            var workbook = XLSX.readFile(filePath);
            var sheet_name_list = workbook.SheetNames;
            var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
            console.log(xlData);
            let headersArr = [];
            headersArr.push(Object.keys(xlData[0]));
            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Read excel file is success',
                data: resp,
                file: xlData,
                ext: extName,
                thead: headersArr
            });
        } else if (extName == 'jpg' || extName == 'png' || extName == 'gif' || extName == 'JPEG' || extName == 'PNG' || extName == 'GIF') {
            var base64Image;
            // console.log("Image path is:", filePath);
            var options = {
                string: true,
                local: true
            };
            base64.encode(filePath, options, (err, image) => {
                if (err) {
                    console.log("error converting base64 format", err);
                    res.status(200).json({
                        success: false,
                        statusCode: 500,
                        message: 'Error converting base64 format',
                        data: err
                    });
                } else {
                    base64Image = image;
                    res.status(200).json({
                        success: true,
                        statusCode: 200,
                        message: 'User data read successfully',
                        data: resp,
                        file: base64Image,
                        ext: extName
                    });
                }
            });
        } else if (extName == 'pdf' || extName == 'PDF') {
            let dataBuffer = fs.readFileSync(filePath);
            pdf(dataBuffer).then(function (data) {
                // number of pages
                console.log(data.numpages);
                // number of rendered pages
                console.log(data.numrender);
                // PDF info
                console.log(data.info);
                // PDF metadata
                console.log(data.metadata);
                // PDF.js version
                // check https://mozilla.github.io/pdf.js/getting_started/
                console.log(data.version);
                // PDF text
                console.log(data.text);
                res.status(200).json({
                    success: true,
                    data: resp,
                    file: data.text,
                    ext: extName
                });
            });
        } else {
            console.log("Invalid file extension found.");
            return res.status(200).json({
                success: false,
                statusCode: 404,
                message: 'Invalid file extension found',
                data: resp,
                error: null
            });
        }
    }).catch(err => {
        console.log("error while getting user data:", err);
        res.status(200).json({
            data: err
        });
    })
}

module.exports.getUsersProfiles = (req, res, next) => {

    userquery.simpleselect('users', '*', `username='${req.body.username}'`).then(resp => {
        var base64encode = [];
        for (let i = 0; i < resp[0].uploadProfiles.split(',').length; i++) {
            base64encode.push(new Buffer(fs.readFileSync(__dirname + `../../../${DIR}/${resp[0].uploadProfiles.split(',')[i]}`)).toString('base64'));
            console.log("base64 encoded length is:", base64encode[i].length);
        }
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Get users profiles',
            data: resp,
            files: base64encode
        });
    }).catch(err => {
        console.log("Error while getting users profiles", err);
        res.status(200).json({
            success: false,
            statusCode: 500,
            message: 'Error while getting users profiles',
            data: err
        });
    })
}

module.exports.addUser = (req, res, next) => {

    let columndata = {
        'firstname': req.body.firstname,
        'lastname': req.body.lastname,
        'username': req.body.username,
        'email': req.body.email,
        'password': req.body.password,
        'phonenumber': req.body.phonenumber,
        'designation': req.body.designation,
        'department': req.body.department,
        'created_at': new Date(),
        'updated_at': new Date()
    };

    userquery.insertTable('users', req.body).then(resp => {
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
        'firstname': req.body.firstname,
        'lastname': req.body.lastname,
        'username': req.body.username,
        'email': req.body.email,
        'password': req.body.password,
        'phonenumber': req.body.phonenumber,
        'designation': req.body.designation,
        'department': req.body.department,
        'created_at': new Date(),
        'updated_at': new Date()
    }, 'user_id', 'firstname', 'lastname', 'username', 'email', 'password', 'phonenumber', 'designation', 'department', 'created_at', 'updated_at').then(resp => {
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

module.exports.updateUserById = (req, res, next) => {

    userquery.updateTableWithWhere('users', `user_id=${req.body.user_id} or username='${req.body.username}'`, req.body).then(resp => {
        console.log("User details updated successful");
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'User details updated successful',
            data: resp
        });
    }).catch(err => {
        console.log("Error while updating user details", err);
        res.status(200).json({
            success: false,
            statusCode: 500,
            message: 'Error while updating user details',
            data: err
        });
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
        password: req.body.password,
        created_at: new Date(),
        updated_at: new Date()
    }).then(resp => {
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Data inserted successfully',
            data: resp
        });
    }).catch(err => {
        console.log("error:", err);
        res.status(200).send(err);
    })
}

// Send Message To User
module.exports.sendNotification = (req, res, next) => {

    console.log("request is:", req.body);

    (async () => {
        let notifyData = {
            'notification': 'birthday',
            'type_of_notify': 'wishes',
            'module_name': 'users',
            'sender_name': 'user1',
            'receiver_name': 'user2',
            'status': 1,
            'user_id': 1,
            'created_at': new Date(),
            'updated_at': new Date()
        }
        await userquery.insertTable('notifications', notifyData).then(async result => {

            console.log("notification result is:", result);

            await userquery.simpleselect('notifications', '*').then(resp => {
                res.status(200).json({
                    success: true,
                    statusCode: 200,
                    message: 'Notification sent successful',
                    data: resp
                });
            }).catch(err => {
                res.status(200).json({
                    success: false,
                    statusCode: 500,
                    message: 'Falied to sent notifications',
                    data: err
                });
            })

        }).catch(err => {
            res.status(200).json({
                success: false,
                statusCode: 500,
                message: 'Erro while send notification',
                data: err
            });
        })
    })();
}