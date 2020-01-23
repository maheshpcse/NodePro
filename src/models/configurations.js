const { Model } = require('objection');

class Configurations extends Model {
    static get tableName() {
        return 'configurations';
    }

    static get idColumn() {
        return 'configId';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                configId: { type: 'integer' },
                config_name: { type: 'string' },
                role: { type: 'string' },
                viewConfig: { type: 'integer' },
                addConfig: { type: 'integer' },
                updateConfig: { type: 'integer' },
                deleteConfig: { type: 'integer' },
                status: { type: 'string' },
                created_at: { type: 'date' },
                updated_at: { type: 'date' }
            }
        }
    }
}

module.exports = Configurations;