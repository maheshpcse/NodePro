const { Model } = require('objection');

class Settings extends Model {
    static get tableName() {
        return 'settings';
    }

    static get idColumn() {
        return 'settingId';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                settingId: { type: 'integer' },
                name: { type: 'string' },
                value: { type: 'string' },
                status: { type: 'string' },
                created_at: { type: 'date' },
                updated_at: { type: 'date' }
            }
        }
    }
}

module.exports = Settings;