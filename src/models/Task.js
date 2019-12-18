const { Model } = require('objection');

class Task extends Model {
    static get tableName() {
        return 'tasks';
    }

    static get idColumn() {
        return 'task_id';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                task_id: { type: 'integer' },
                title: { type:'string' },
                description: { type:'string' },
                is_complete: { type:'tinyint' },
                user_id: { type:'integer' },
                created_at: { type: 'timestamp' },
                updated_at: { type: 'timestamp' }
            }
        }
    }
}

module.exports = Task;