const db = require('../db');
const { Event, EventCategory, Profile, User } = require('../models/index');
const userIDs = require('./usersSeedData');
const mongoose = require('mongoose');

const main = async () => {
  const profilesData = [
    {
      userID: mongoose.Types.ObjectId('65494af870a6b68070c4093b'),
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '1990-05-15',
      profileImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/John_Doe%2C_born_John_Nommensen_Duchac.jpg/440px-John_Doe%2C_born_John_Nommensen_Duchac.jpg',
    },
    {
      userID: mongoose.Types.ObjectId('65494af970a6b68070c4093e'),
      firstName: 'Alice',
      lastName: 'Smith',
      dateOfBirth: '1985-12-03',
      profileImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPIaTeWG3XqpvfjxFWFQKBDRvh5Swide5NuxNw5_nAsT0Im9dlKYirE7k2Pb0Ybjp8adE&usqp=CAU',
    },
    {
      userID: mongoose.Types.ObjectId('65494af970a6b68070c40940'),
      firstName: 'Bob',
      lastName: 'Johnson',
      dateOfBirth: '1995-08-20',
      profileImage: 'https://obamascholars.oxy.edu/sites/default/files/bob-johnson_800x1200.jpg',
    }
  ];

  // Create Profile instances and save them to the database
  for (const profileData of profilesData) {
    const profile = new Profile(profileData);
    await profile.save();
  }
};

const run = async () => {
  await main();
  db.close();
};

run();
