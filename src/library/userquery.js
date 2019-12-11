const knex = require('../config/knex.js');

let simpleselect = function (tablename, columns) {
    return new Promise((resolve, reject) => {
        let mod = knex.knex.select(columns).from(tablename);
        mod.then(result => {
            resolve(result);
        }).catch(errpr => {
            reject(errpr)
        })
    })
}

module.exports = { simpleselect }