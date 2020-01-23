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


// role is assigned or not
let checkRoleIsFunction = (request, role, method, data) => {
    return new Promise((resolve, reject) => {
        var id = request.setHeaders.id;
        var role = request.body;
    })
}

module.exports = {
    checkRoleIsFunction
}