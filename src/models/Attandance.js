const { Model } = require('objection');

class Attadance extends Model {
    static get tableName() {
        return 'attandance';
    }

    static get idColumn() {
        return 'attandId'
    }

    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                attandId: { type: 'integer' },
                daily: { type: 'string' },
                weekly: { type: 'string' },
                monthly: { type: 'string' },
                status: { type: 'string' },
                created_at: { type: 'date' },
                updated_at: { type: 'date' }
            }
        }
    }
}

module.exports = Attadance;