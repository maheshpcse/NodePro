require('dotenv').config();
const Promise = require('bluebird');
const CryptoJS = require('crypto-js');
const {
    raw,
    objection,
    ref,
    lit
} = require('objection');
// const request = require('request');
var knex = require('../config/knex.js');
var userquery = require('./userquery.js');

// role is assigned or not
let checkRoleIsFunction = (req, empId, empRole) => {
    return new Promise((resolve, reject) => {
        var id = req.headers['id'];
        var role = req.headers['role'];
        console.log("user id:", id, ",", "role:", role);
        try {
            if (id == empId && role == empRole) {
                (async () => {
                    await isPrivilegedCheck(empId, empRole).then(async data => {
                        if (data) {
                            resolve(true);
                        } else {
                            resolve(false);
                        }
                    }).catch(err => {
                        console.log("Error while checking privileges", err);
                        resolve(false);
                    })
                })();
            }
            if (id == empId && empRole.includes(role)) {
                // resolve(true);
                (async () => {
                    await isPrivilegedCheck(empId, role).then(async data => {
                        if (data) {
                            resolve(true);
                        } else {
                            resolve(false);
                        }
                    }).catch(err => {
                        console.log("Error while checking privileges", err);
                        resolve(false);
                    })
                })();
            } else {
                resolve(false);
            }
        } catch (error) {
            console.log("Error while checking roles", error);
            resolve(false);
        }
    })
}

// check role is having privileges to access data
let isPrivilegedCheck = (empId, empRole) => {

    return new Promise((resolve, reject) => {
        userquery.simpleselect('configurations', '*', `userId = '${empId}' && role = '${empRole}'`).then(resp => {
            // console.log("response is:", resp);
            if (resp.viewConfig == 1) {
                resolve(true);
            } else if (resp.viewConfig == 0) {
                resolve(false);
            }
        }).catch(err => {
            console.log("Error while getting configuration data", err);
            resolve(false);
        })
    })
}

module.exports = {
    checkRoleIsFunction
}