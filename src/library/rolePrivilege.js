'use strict';

require('dotenv').config();
const Promise = require('bluebird');
const CryptoJS = require('crypto-js');
const sessionstorage = require('sessionstorage');
const {
    raw,
    objection,
    ref,
    lit
} = require('objection');
// const request = require('request');
var knex = require('../config/knex.js');
var userquery = require('./userquery.js');


// checking if user is having (ADD/UPDATE/DELETE/VIEW) data
let checkRoleIsHaving = (req, empId, empRole, configId, method) => {
    return new Promise((resolve, reject) => {
        var id = req.headers['authorization'].split(',')[1];
        var role = req.headers['authorization'].split(',')[2];
        console.log("userId:", id, ",", "role:", role, ",", "configId:", configId, ",", "method:", method);
        try {
            if (id == empId && role == empRole) {
                (async () => {
                    await isPrivilegedCheck(configId, empRole, method).then(async data => {
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
            } else if (id == empId && empRole.includes(role)) {
                (async () => {
                    await isPrivilegedCheck(configId, empRole, method).then(async data => {
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
        } catch (error) {

        }
    })
}

// check role is having privileges to access data
let isPrivilegedCheck = (configId, empRole, method) => {
    return new Promise((resolve, reject) => {
        userquery.simpleselect('configurations', '*', `configId = ${configId} AND role LIKE '%${empRole}%'`).then(resp => {
            // console.log("config response is:", resp);
            // console.log("method is:", method, typeof (method));
            if (method == 'I' || method == 'i') {
                if (resp[0].addConfig == 1) {
                    resolve(true);
                }
            } else if (method == 'U' || method == 'u') {
                if (resp[0].updateConfig == 1) {
                    resolve(true);
                }
            } else if (method == 'D' || method == 'd') {
                if (resp[0].deleteConfig == 1) {
                    resolve(true);
                }
            } else if (method === 'V' || method === 'v') {
                if (resp[0].viewConfig == 1) {
                    resolve(true);
                }
            } else {
                resolve(false);
            }
        }).catch(err => {
            console.log("Error while getting configuration data", err);
            resolve(false);
        })
    });
}

module.exports = {
    checkRoleIsHaving,
    isPrivilegedCheck
}