require('dotenv').config();
const Promise = require('bluebird');
const CryptoJS = require('crypto-js');
const {
    raw,
    objection,
    ref,
    lit
} = require('objection');
const request = require('request');
var knex = require('../config/knex.js');
var config = require('../config/config.js');

// Send not allowed messages
let getErrorMessage = (method, status) => {
    return new Promise((resolve, reject) => {
        console.log("method:", method, ",", "status:", status);
        if (method == 'V' || method == 'v') {
            resolve(config.errorMsg.view);
        }
        if (method == 'I' || method == 'i') {
            resolve(config.errorMsg.add);
        }
        if (method == 'U' || method == 'u') {
            resolve(config.errorMsg.update);
        }
        if (method == 'D' || method == 'd') {
            if (status == 1) {
                resolve(config.errorMsg.delete);
            } else if (status == 0) {
                resolve(config.errorMsg.restore);
            }
        } else {
            resolve('Error while updating information');
        }
    });
}

module.exports = {
    getErrorMessage
}