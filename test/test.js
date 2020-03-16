const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
var server = require('../src/server.js');

describe('Express server test', () => {
    describe('Task module test', () => {
        it('should post', () => {
            chai.request(server)
                .post('/api/addTask')
                .send(
                    {
                        'title': 'vacation',
                        'description': 'reach the valley',
                        'is_complete': 0,
                        'user_id': 6,
                        'created_at': new Date(),
                        'updated_at': new Date()
                    }
                )
                .end((err, res) => {
                    assert.equal(res.body.statusCode, 200);
                    assert.equal(typeof(res.body.data), 'object');
                });
        });
    });
});