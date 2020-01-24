const { Model } = require('objection');

class Notifications extends Model {
    static get tableName() {
        return 'notifications';
    }

    static get idColumn() {
        return 'notify_id';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                notify_id: { type: 'integer' },
                notification: { type: 'string' },
                type_of_notify: { type: 'string' },
                module_name: { type: 'string' },
                sender_name: { type: 'string' },
                receiver_name: { type: 'string' },
                status: { type: 'integer' },
                user_id: { type: 'integer' },
                created_at: { type: 'timestamp' },
                updated_at: { type: 'timestamp' }
            }
        }
    }
}

module.exports = Notifications;