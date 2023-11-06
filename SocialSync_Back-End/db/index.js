const mongoose = require('mongoose')

mongoose
    .connect('mongodb+srv://WOS_IAEA:123LookAtMe@woscluster0.2uovivz.mongodb.net/SocialSync')
    .then(() => {
        console.log('Successfully connected to MongoDB.')
    })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db