const objection = require('objection');
const Promise = require('bluebird');
const knex = require('../config/knex.js');

// CRUD Operation Methods
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


// Join Methods
let joinTwoTables = function (tableName1, tableName2, columnName1, columnName2, columns) {
    return new Promise((resolve, reject) => {
        let mod = knex.knex(tableName1)
            .join(tableName2, tableName1 + '.' + columnName1, '=', tableName2 + '.' + columnName2)
            .select(columns)
        mod.then(result => {
            resolve(result);
        }).catch(error => {
            reject(error);
        })
    })
}

let joinwithWhereTable = function (tableName1, tableName2, columnName, columnValue) {
    return new Promise((resolve, reject) => {
        let mod = knex.knex.select('*').from(tableName1).join(tableName2, tableName2 + '.' + columnName, knex.knex.raw('?', [columnValue]))
        mod.then(result => {
            resolve(result);
        }).catch(error => {
            reject(error);
        })
    })
}

let innerJoinTable = function (tableName1, tableName2, columnName1, columnName2) {
    return new Promise((resolve, reject) => {
        let mod = knex.knex.from(tableName1).innerJoin(tableName2, tableName1 + '.' + columnName1, '=', tableName2 + '.' + columnName2)
        mod.then(result => {
            resolve(result);
        }).catch(error => {
            reject(error);
        })
    })
}

let leftJoinTable = function (tableName1, tableName2, columnName1, columnName2) {
    return new Promise((resolve, reject) => {
        let mod = knex.knex.select('*').from(tableName1).leftJoin(tableName2, tableName1 + '.' + columnName1, '=', tableName2 + '.' + columnName2)
        mod.then(result => {
            resolve(result);
        }).catch(error => {
            reject(error);
        })
    })
}

let rightJoinTable = function (tableName1, tableName2, columnName1, columnName2) {
    return new Promise((resolve, reject) => {
        let mod = knex.knex.select('*').from(tableName1).rightJoin(tableName2, tableName1 + '.' + columnName1, '=', tableName2 + '.' + columnName2)
        mod.then(result => {
            resolve(result);
        }).catch(error => {
            reject(error);
        })
    })
}

let crossJoinTable = function (tableName1, tableName2, columnName1, columnName2) {
    return new Promise((resolve, reject) => {
        let mod = knex.knex.select('*').from(tableName1).crossJoin(tableName2, tableName1 + '.' + columnName1, '=', tableName2 + '.' + columnName2)
        mod.then(result => {
            resolve(result);
        }).catch(error => {
            reject(error);
        })
    })
}


// OnClause Methods
let onInTable = function (tableName1, tableName2, columnName1, columnName2, columnValue) {
    return new Promise((resolve, reject) => {
        let mod = knex.knex.select('*').from(tableName1).join(tableName2, function () {
            this.on(tableName1 + '.' + columnName1, '=', tableName2 + '.' + columnName2).onIn(tableName2 + '.' + columnName2, [columnValue])
        })
        mod.then(result => {
            resolve(result);
        }).catch(error => {
            reject(error);
        })
    })
}


// Having Methods
let havingTable = function (tableName, groupByColumn, orderByColumn, columnValue) {
    return new Promise((resolve, reject) => {
        let mod = knex.knex(tableName).groupBy(groupByColumn).orderBy(orderByColumn, 'asc' | 'desc').having(groupByColumn, '>', columnValue);
        mod.then(result => {
            resolve(result);
        }).catch(error => {
            reject(error);
        })
    })
}


// Transacting Methods
let transactingTable = function (tableName1, tableName2, data) {
    return (async () => {
        // await transactionData(trxData, id)
        knex.knex.transaction((trx) => {
            knex.knex(tableName1).transacting(trx).insert(data).then((resp) => {
                var id = resp[0];
                console.log("response:", id);
                console.log("trx:", trx);
                // return transactionData(trx, id);
            }).then(trx.commit).catch(trx.rollback);
        }).then((resp) => {
            console.log('Transaction complete.');
        }).catch((err) => {
            console.error('Transaction error.', err);
        });
    })();
}

// let startTransactingTable = function (tableName, data) {
//     const trx = await tableName.startTrasaction();
//     let mod;
//     return new Promise((resolve, reject) => {
//         try {
//             mod = knex.knex.transaction((trx) => {
//                     return knex.knex(tableName).transacting(trx).insert(data).then((resp) => {})
//                 })
//                 (async () => {
//                     await trx.commit();
//                 })
//         } catch (err) {
//             await.trx.rollback();
//             throw err;
//         }
//         mod.then(result => {
//             resolve(result);
//         }).catch(error => {
//             reject(error);
//         })
//     })
// }

module.exports = {
    insertTable,
    simpleselect,
    updateTable,
    deleteTable,
    joinTwoTables,
    joinwithWhereTable,
    innerJoinTable,
    leftJoinTable,
    rightJoinTable,
    crossJoinTable,
    onInTable,
    havingTable,
    transactingTable,
    // startTransactingTable
}