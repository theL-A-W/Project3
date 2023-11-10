const { Schema } = require('mongoose');

const profileSchema = new Schema({
    userID: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    dateOfBirth: { type: String, default: '' },
    profileImage: { type: String, default: '' },
}, { timestamps: true });

module.exports = profileSchema;



