const mongoose = require('mongoose');
const db = require('../db');
const { Event, EventCategory, Profile, User } = require('../models/index');

// Define userIDs array to store generated user IDs
const userIDs = [];

const main = async () => {
  // Users Data
  const usersData = [
    {
      userName: 'user1',
      email: 'user1@example.com',
      passwordHash: 'passwordhash1',
    },
    {
      userName: 'user2',
      email: 'user2@example.com',
      passwordHash: 'passwordhash2',
    },
    {
      userName: 'user3',
      email: 'user3@example.com',
      passwordHash: 'passwordhash3',
    },
  ];

  // Create User instances and save them to the database
  for (const userData of usersData) {
    const user = new User(userData);
    const savedUser = await user.save();
    userIDs.push(savedUser._id); // Store the generated user IDs
  }

  // Event Categories
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

  // Events Data
  const eventsData = [
    {
      userId: userIDs[0], // Use the generated user IDs
      eventCategoryId: mongoose.Types.ObjectId('categoryId1'), // Replace with actual category ID
      title: 'Business Event 1',
      description: 'An example business event.',
      startDate: new Date('2023-11-07T10:00:00'),
      endDate: new Date('2023-11-07T12:00:00'),
      privacyLevel: 'Public',
      location: 'Business Center A',
      image: 'https://example.com/business-event.jpg',
    },
    {
      userId: userIDs[1], // Use the generated user IDs
      eventCategoryId: mongoose.Types.ObjectId('categoryId2'), // Replace with actual category ID
      title: 'Sports Event 1',
      description: 'A sports event for enthusiasts.',
      startDate: new Date('2023-11-07T10:00:00'),
      endDate: new Date('2023-11-07T12:00:00'),
      privacyLevel: 'Private',
      location: 'Sports Stadium',
      image: 'https://example.com/sports-event.jpg',
    },
    {
      userId: userIDs[2], // Use the generated user IDs
      eventCategoryId: mongoose.Types.ObjectId('categoryId3'), // Replace with actual category ID
      title: 'Party Time',
      description: 'Let’s celebrate and have a good time!',
      startDate: new Date('2023-11-08T20:00:00'),
      endDate: new Date('2023-11-08T23:00:00'),
      privacyLevel: 'Public',
      location: 'Party Venue',
      image: 'https://example.com/party-event.jpg',
    },
  ];

  // Create Event instances and save them to the database
  for (const eventData of eventsData) {
    const event = new Event(eventData);
    await event.save();
  }

  // Profiles Data
  const profilesData = [
    {
      userID: userIDs[0], // Use the generated user IDs
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '1990-05-15',
      profileImage: 'https://example.com/john-doe.jpg',
    },
    {
      userID: userIDs[1], // Use the generated user IDs
      firstName: 'Alice',
      lastName: 'Smith',
      dateOfBirth: '1985-12-03',
      profileImage: 'https://example.com/alice-smith.jpg',
    },
    {
      userID: userIDs[2], // Use the generated user IDs
      firstName: 'Bob',
      lastName: 'Johnson',
      dateOfBirth: '1995-08-20',
      profileImage: 'https://example.com/bob-johnson.jpg',
    },
  ];

  // Create Profile instances and save them to the database
  for (const profileData of profilesData) {
    const profile = new Profile(profileData);
    await profile.save();
  }

  db.close();
};

main();
