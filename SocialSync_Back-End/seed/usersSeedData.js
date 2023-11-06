const db = require('../db');
const { Event, EventCategory, Profile, User } = require('../models/index');
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
console.log("DB On")

const main = async () => {
    
    const User1 = await  User.create({
        userName: 'user12345',
        email: 'user1@example.com',
        passwordHash: 'passwordhash1',
    })

    const User2 = await  User.create({
        userName: 'user2',
        email: 'user2@example.com',
        passwordHash: 'passwordhash2',
    })

    const User3 = await  User.create({
        userName: 'user3',
        email: 'user3@example.com',
        passwordHash: 'passwordhash3',
    })
}

seedAll = async () => {
    await db.dropDatabase()
    console.log("droppedDB")
    await main()
    console.log("completed main")
    await db.close()
    console.log("closed db")
    }
    
    seedAll()
