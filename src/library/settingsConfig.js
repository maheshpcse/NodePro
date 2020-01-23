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