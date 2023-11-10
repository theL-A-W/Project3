const db = require('../db');
const { Event, EventCategory, Profile, User } = require('../models/index');
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
console.log('DB On');

const main = async () => {
  ////Add new Users\\\\
  const User1 = await User.create({
    UserName: 'User12345',
    email: 'User1@example.com',
    passwordHash: 'passwordhash1',
  });
  const User2 = await User.create({
    UserName: 'User2',
    email: 'User2@example.com',
    passwordHash: 'passwordhash2',
  });
  const User3 = await User.create({
    UserName: 'User3',
    email: 'User3@example.com',
    passwordHash: 'passwordhash3',
  });

// Now that all users are created, let's add friend relationships // Let's say User1 and User2 are friends with User3 
User1.friendsUserID.push(User3._id); User2.friendsUserID.push(User3._id);

 // And maybe User3 is also friends with User1 
 User3.friendsUserID.push(User1._id);
 // Don't forget to save the updated user documents 
 await User1.save(); await User2.save(); await User3.save();

  ////Add new Event Categories\\\\
  const eventCategories1 = await EventCategory.create({
    name: 'Business',
    description: 'Events related to the business world.',
  });
  
  const eventCategories2 = await EventCategory.create({
    name: 'Sports',
    description: 'Sports-related events and activities.',
  });

  const eventCategories3 = await EventCategory.create({
    name: 'Party',
    description: 'Party and entertainment events.',
  });

  const eventCategories4 = await EventCategory.create({
    name: 'Other',
    description: 'Other miscellaneous events and categories.'
  });

  ////Add new Profiles\\\\
  const profilesData = [
    {
      userID: User1._id,
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '1990-05-15',
      profileImage: 
        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/John_Doe%2C_born_John_Nommensen_Duchac.jpg/1024px-John_Doe%2C_born_John_Nommensen_Duchac.jpg',
    },
    {
      userID: User2._id,
      firstName: 'Alice',
      lastName: 'Smith',
      dateOfBirth: '1985-12-03',
      profileImage: 
        'https://assets.vogue.com/photos/5891f2f8186d7c1b6493c186/master/w_2240,c_limit/img-alicesmith_133654950324.jpg',
    },
    {
      userID: User3._id,
      firstName: 'Bob',
      lastName: 'Johnson',
      dateOfBirth: '1995-08-20',
      profileImage: 
        'https://obamascholars.oxy.edu/sites/default/files/bob-johnson_800x1200.jpg',
    },
  ];

  // Create Profile instances and save them to the database
  for (const profileData of profilesData) {
    const profile = new Profile(profileData);
    await profile.save();
  }

  ////Add new Events\\\\
  const eventsData = [
    {
      userId: User1._id,
      eventCategoryId: eventCategories1._id,
      title: 'Business Event 1',
      description: 'An example business event.',
      startDate: new Date('2023-11-07T10:00:00'), // November 7, 2023, 10:00 AM
      endDate: new Date('2023-11-07T12:00:00'), // November 7, 2023, 12:00 PM
      privacyLevel: 'Public',
      location: 'Business Center A',
      image:
        'https://img.freepik.com/free-photo/yes_53876-47102.jpg?w=1380&t=st=1699296543~exp=1699297143~hmac=7354af21c90591706e451d554b671c308da2aca6eada31c6f531eb6690062b83',
    },
    {
      userId: User2._id,
      eventCategoryId: eventCategories2._id,
      title: 'Sports Event 1',
      description: 'A sports event for enthusiasts.',
      startDate: new Date('2023-11-07T10:00:00'), // November 7, 2023, 10:00 AM
      endDate: new Date('2023-11-07T12:00:00'), // November 7, 2023, 12:00 PM
      privacyLevel: 'Private',
      location: 'Sports Stadium',
      image:
        'https://img.freepik.com/free-photo/sports-tools_53876-138077.jpg?w=1380&t=st=1699296782~exp=1699297382~hmac=41d8ab4cc4968a348bff2bac730e23f37de0ea50b97ce25e20c2b550d4482618',
    },
    {
      userId: User3._id,
      eventCategoryId: eventCategories3._id,
      title: 'Party Time',
      description: 'Let’s celebrate and have a good time!',
      startDate: new Date('2023-11-08T20:00:00'), // November 8, 2023, 8:00 PM
      endDate: new Date('2023-11-08T23:00:00'), // November 8, 2023, 11:00 PM
      privacyLevel: 'Public',
      location: 'Party Venue',
      image:
        'https://www.visionvivaah.com/blog/wp-content/uploads/2019/12/Event-Organisers-For-Dance-Parties-1024x514.jpg',
    },
  ];

  // Create Event instances and save them to the database
  for (const eventData of eventsData) {
    const event = new Event(eventData);
    await event.save();
  }
};

seedAll = async () => {
  await db.dropDatabase();
  console.log('droppedDB');
  await main();
  console.log('completed main');
  await db.close();
  console.log('closed db');
};

seedAll();
