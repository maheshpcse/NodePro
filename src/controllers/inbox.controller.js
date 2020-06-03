const {
    transaction
} = require('objection');
var knex = require('../config/knex.js');
var userquery = require('../library/userquery.js');


// SEND Message API
module.exports.sendMessage = (req, res, next) => {

    console.log(req.body);

    userquery.insertTable('mail_inbox', req.body).then(resp => {
        console.log('New message was inserted', resp);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'New message sent successful',
            data: resp
        });
    }).catch(err => {
        console.log('Unable to insert new message');
        res.status(200).json({
            success: true,
            statusCode: 500,
            message: 'Unable to send a message',
            data: null
        });
    })
}

// SEND Message from Draft API
module.exports.sendDraftMessage = (req, res, next) => {

    console.log(req.body);

    userquery.updateTableWithWhere('mail_inbox', `inbox_id=${req.body.inbox_id}`, req.body).then(resp => {
        console.log('Draft message sent successful', resp);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Draft message sent successful',
            data: resp
        });
    }).catch(err => {
        console.log('Unable to send draft message');
        res.status(200).json({
            success: true,
            statusCode: 500,
            message: 'Unable to send draft message',
            data: null
        });
    })
}

// GET messages API
module.exports.receiveMessages = (req, res, next) => {

    userquery.simpleselect('mail_inbox', '*').then(resp => {
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Get messages list',
            data: resp
        });
    }).catch(err => {
        res.status(200).send(err);
    })
}

// ADD REMOVE Star message Api
module.exports.addRemoveStar = (req, res, next) => {

    console.log(req.body);
    
    userquery.updateTableWithWhere('mail_inbox', `inbox_id=${req.body.inbox_id}`, req.body).then(resp => {
        console.log('Add remove starred to message success', resp);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Add remove starred to message success',
            data: resp
        });
    }).catch(err => {
        console.log('Unable to add remove starred to message');
        res.status(200).json({
            success: true,
            statusCode: 500,
            message: 'Unable to add remove starred to message',
            data: null
        });
    })
}

// MARK IMPORTNAT NOT IMPORTANT message Api
module.exports.markImportant = (req, res, next) => {

    console.log(req.body);
    
    userquery.updateTableWithWhere('mail_inbox', `inbox_id=${req.body.inbox_id}`, req.body).then(resp => {
        console.log('Mark important to message success', resp);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Mark important to message success',
            data: resp
        });
    }).catch(err => {
        console.log('Unable to mark important to message');
        res.status(200).json({
            success: true,
            statusCode: 500,
            message: 'Unable to mark important to message',
            data: null
        });
    })
}

// DELETE message Api
module.exports.deleteMessage = (req, res, next) =>{

    console.log(req.body);
    
    userquery.updateTableWithWhere('mail_inbox', `inbox_id=${req.body.inbox_id}`, req.body).then(resp => {
        console.log('Message deleted successful', resp);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Message deleted successful',
            data: resp
        });
    }).catch(err => {
        console.log('Unable to delete a message');
        res.status(200).json({
            success: true,
            statusCode: 500,
            message: 'Unable to delete a message',
            data: null
        });
    })
}

//  MAR AS READ UNREAD message Api
module.exports.markAsReadUnread = (req, res, next) =>{

    console.log(req.body);
    
    userquery.updateTableWithWhere('mail_inbox', `inbox_id=${req.body.inbox_id}`, req.body).then(resp => {
        console.log('Mark as read to a message successful', resp);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Mark as read to a message successful',
            data: resp
        });
    }).catch(err => {
        console.log('Unable to mark as read to message');
        res.status(200).json({
            success: true,
            statusCode: 500,
            message: 'Unable to mark as read to message',
            data: null
        });
    })
}