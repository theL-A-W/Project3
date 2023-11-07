const db = require('../db');
const { Event, EventCategory, Profile, User } = require('../models/index');

// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const db = require('../db');
const { Event } = require('../models/index');

const main = async () => {
  const eventsData = [
    {
      userId: 'userId1', // Replace with the actual user ID
      eventCategoryId: 'categoryId1', // Replace with the actual event category ID
      title: 'Business Event 1',
      description: 'An example business event.',
      startDate: new Date('2023-11-07T10:00:00'), // November 7, 2023, 10:00 AM
      endDate: new Date('2023-11-07T12:00:00'), // November 7, 2023, 12:00 PM
      privacyLevel: 'Public',
      location: 'Business Center A',
      image: 'https://img.freepik.com/free-photo/yes_53876-47102.jpg?w=1380&t=st=1699296543~exp=1699297143~hmac=7354af21c90591706e451d554b671c308da2aca6eada31c6f531eb6690062b83',
    },
    {
      userId: 'userId2', // Replace with the actual user ID
      eventCategoryId: 'categoryId2', // Replace with the actual event category ID
      title: 'Sports Event 1',
      description: 'A sports event for enthusiasts.',
      startDate: new Date('2023-11-07T10:00:00'), // November 7, 2023, 10:00 AM
      endDate: new Date('2023-11-07T12:00:00'), // November 7, 2023, 12:00 PM
      privacyLevel: 'Private',
      location: 'Sports Stadium',
      image: 'https://img.freepik.com/free-photo/sports-tools_53876-138077.jpg?w=1380&t=st=1699296782~exp=1699297382~hmac=41d8ab4cc4968a348bff2bac730e23f37de0ea50b97ce25e20c2b550d4482618',
    },
    {
      userId: 'userId3', // Replace with the actual user ID
      eventCategoryId: 'categoryId3', // Replace with the actual event category ID
      title: 'Party Time',
      description: 'Let’s celebrate and have a good time!',
      startDate: new Date('2023-11-08T20:00:00'), // November 8, 2023, 8:00 PM
      endDate: new Date('2023-11-08T23:00:00'), // November 8, 2023, 11:00 PM
      privacyLevel: 'Public',
      location: 'Party Venue',
      image: 'https://www.visionvivaah.com/blog/wp-content/uploads/2019/12/Event-Organisers-For-Dance-Parties-1024x514.jpg',
    },
  ];

  // Create Event instances and save them to the database
  for (const eventData of eventsData) {
    const event = new Event(eventData);
    await event.save();
  }
};

const run = async () => {
  await main();
  db.close();
};

run();
