const db = require('../services/database');

const WordModel = db.defineModel('word', {
    fields: {
        id: {
            type: 'integer',
            unique: true,
            primaryKey: true,
            allowNull: false
        },

        parentId: {
            type: 'integer',
            allowNull: true
        },

        word: {
            type: 'string',
            unique: false,
            allowNull: false
        },

        mean: {
            type: 'string'
        },

        success: {
            type: 'integer',
            defaultValue: 0
        },

        failure: {
            type: 'integer',
            defaultValue: 0
        },

        hidden: {
            type: 'string',
            defaultValue: 'N'
        },

        rate: {
            type: 'integer',
            defaultValue: 0
        }
    }
});

module.exports = WordModel;