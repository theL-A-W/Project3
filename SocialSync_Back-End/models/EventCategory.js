const { Schema } = require('mongoose');

const eventCategorySchema = new Schema({
    name: { type: String },
    description: { type: String },
}, { timestamps: true });

module.exports = eventCategorySchema;