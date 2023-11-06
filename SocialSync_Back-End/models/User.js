const { Schema } = require('mongoose');

const UserSchema = new Schema({
    userName: { type: String },
    email: { type: String },
    passwordHash: { type: String },
    friendsUserID: {type: Schema.Types.ObjectId, ref: 'User', required: false},
    PendingFriendsUserID: {type: Schema.Types.ObjectId, ref: 'User', required: false},
}, { timestamps: true });

module.exports = UserSchema;
