const mongoose = require('mongoose')
const eventSchema = require('./Event')
const eventCategorySchema = require('./EventCategory')
// const friendshipSchema = require('./Friendship')
const profileSchema = require('./Profile')
const userSchema = require('./User')

const Event = mongoose.model('Event', eventSchema)
const EventCategory = mongoose.model('EventCategory', eventCategorySchema)
// const Friendship = mongoose.model('Friendship', friendshipSchema);
const Profile = mongoose.model('Profile', profileSchema)
const User = mongoose.model('User', userSchema)

module.exports = {
    Event,
    EventCategory,
    // Friendship,
    Profile,
    User
};
