const knex = require('../config/knex.js');

let insertTable = function (tablename, data) {
    return new Promise((resolve, reject) => {
        let mod = knex.knex(tablename).insert(data);
        mod.then(result => {
            resolve(result);
        }).catch(error => {
            reject(error)
        })
    })
}

let simpleselect = function (tablename, columns, whereCond, orderBy) {
    return new Promise((resolve, reject) => {
        let mod = knex.knex.select(columns).from(tablename);
        if (whereCond) {
            mod = mod.whereRaw(whereCond);
        }
        if (orderBy) {
            mod = mod.orderByRaw(orderBy);
        }
        mod.then(result => {
            resolve(result);
        }).catch(error => {
            reject(error)
        })
    })
}

let deleteTable = function (tablename, columnName, columnValue) {
    return new Promise((resolve, reject) => {
        let mod = knex.knex(tablename).where(columnName, columnValue).del();
        mod.then(result => {
            resolve(result);
        }).catch(error => {
            reject(error)
        })
    })
}

module.exports = {
    insertTable,
    simpleselect,
    deleteTable
}