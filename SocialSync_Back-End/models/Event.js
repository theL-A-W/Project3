const { Schema } = require('mongoose');

const eventSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    eventCategoryId: {type: Schema.Types.ObjectId, ref: 'EventCategory', required: true},
    title: { type: String },
    description: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    privacyLevel: { type: String },
    location: { type: String },
    image: { type: String },
}, { timestamps: true });

module.exports = eventSchema;



