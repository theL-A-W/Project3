const { Schema } = require('mongoose');

const eventSchema = new Schema({
    userID: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    categoryID: {type: Schema.Types.ObjectId, ref: 'EventCategory', required: true},
    title: { type: String },
    description: { type: String },
    startDate: { type: Number },
    endDate: { type: Number },
    privacyLevel: { type: String },
    location: { type: String },
    image: { type: String },
}, { timestamps: true });

module.exports = eventSchema;



