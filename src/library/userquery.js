const knex = require('../config/knex.js');

let insertTable = function (tableName, data) {
    return new Promise((resolve, reject) => {
        let mod = knex.knex(tableName).insert(data);
        mod.then(result => {
            resolve(result);
        }).catch(error => {
            reject(error);
        })
    })
}

let simpleselect = function (tableName, columns, whereCond, orderBy) {
    return new Promise((resolve, reject) => {
        let mod = knex.knex.select(columns).from(tableName);
        if (whereCond) {
            mod = mod.whereRaw(whereCond);
        }
        if (orderBy) {
            mod = mod.orderByRaw(orderBy);
        }
        mod.then(result => {
            resolve(result);
        }).catch(error => {
            reject(error);
        })
    })
}

let updateTable = function (tableName, whereCond, updateCond, whereColumn, updateColumn) {
    return new Promise((resolve, reject) => {
        let mod = knex.knex(tableName).where(whereCond).update(updateCond, [whereColumn, updateColumn]);
        mod.then(result => {
            resolve(result);
        }).catch(error => {
            reject(error);
        })
    })
}

let deleteTable = function (tableName, columnName, columnValue) {
    return new Promise((resolve, reject) => {
        let mod = knex.knex(tableName).where(columnName, columnValue).del();
        mod.then(result => {
            resolve(result);
        }).catch(error => {
            reject(error);
        })
    })
}

module.exports = {
    insertTable,
    simpleselect,
    updateTable,
    deleteTable
}