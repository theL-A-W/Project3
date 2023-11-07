const db = require('../db');
const { Event, EventCategory, Profile, User } = require('../models/index');

// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const main = async () => {
    const categories = [
      {
        name: 'Business',
        description: 'Events related to the business world.',
      },
      {
        name: 'Sports',
        description: 'Sports-related events and activities.',
      },
      {
        name: 'Party',
        description: 'Party and entertainment events.',
      },
      {
        name: 'Other',
        description: 'Other miscellaneous events and categories.',
      },
    ];
  
    // Create EventCategory instances and save them to the database
    for (const categoryData of categories) {
      const eventCategory = new EventCategory(categoryData);
      await eventCategory.save();
    }
  };
  
  seedAll = async () => {
    await db.dropDatabase()
    console.log("droppedDB")
    await main()
    console.log("completed main")
    await db.close()
    console.log("closed db")
    }
    
    seedAll()
