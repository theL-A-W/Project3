const { Schema } = require('mongoose');

const profileSchema = new Schema({
    userID: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    firstName: { type: String },
    lastName: { type: String },
    dateOfBirth: { type: String },
    profileImage: { type: String },
}, { timestamps: true });

module.exports = profileSchema;



