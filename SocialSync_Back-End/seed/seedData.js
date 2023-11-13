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
    {
      userId: User2._id,
      eventCategoryId: eventCategories1._id,
      title: 'Tech Conference',
      description: 'Explore the latest trends in technology.',
      startDate: new Date('2023-11-10T09:00:00'), // November 10, 2023, 9:00 AM
      endDate: new Date('2023-11-10T17:00:00'), // November 10, 2023, 5:00 PM
      privacyLevel: 'Public',
      location: 'Tech Hub Center',
      image: 'https://i.imgur.com/1mC27c6.jpg',
    },
    {
      userId: User3._id,
      eventCategoryId: eventCategories2._id,
      title: 'Fitness Workshop',
      description: 'Join us for a day of fitness and well-being.',
      startDate: new Date('2023-11-11T12:00:00'), // November 11, 2023, 12:00 PM
      endDate: new Date('2023-11-11T14:00:00'), // November 11, 2023, 2:00 PM
      privacyLevel: 'Public',
      location: 'FitZone Studio',
      image: 'https://i.imgur.com/jKUd2zJ.jpg',
    },
    {
      userId: User1._id,
      eventCategoryId: eventCategories3._id,
      title: 'Art Exhibition',
      description: 'Experience the beauty of contemporary art.',
      startDate: new Date('2023-11-12T15:00:00'), // November 12, 2023, 3:00 PM
      endDate: new Date('2023-11-12T18:00:00'), // November 12, 2023, 6:00 PM
      privacyLevel: 'Public',
      location: 'Art Gallery X',
      image: 'https://i.imgur.com/NzlK9WZ.jpg',
    },
    {
      userId: User2._id,
      eventCategoryId: eventCategories2._id,
      title: 'Music Festival',
      description: 'A weekend of live music and entertainment.',
      startDate: new Date('2023-11-15T18:00:00'), // November 15, 2023, 6:00 PM
      endDate: new Date('2023-11-17T23:59:59'), // November 17, 2023, 11:59:59 PM
      privacyLevel: 'Public',
      location: 'City Park Amphitheater',
      image: 'https://i.imgur.com/u6wqV3y.jpg',
    },
    {
      userId: User3._id,
      eventCategoryId: eventCategories1._id,
      title: 'Food Truck Fair',
      description: 'Savor delicious bites from local food trucks.',
      startDate: new Date('2023-11-18T12:00:00'), // November 18, 2023, 12:00 PM
      endDate: new Date('2023-11-18T15:00:00'), // November 18, 2023, 3:00 PM
      privacyLevel: 'Public',
      location: 'Downtown Square',
      image: 'https://i.imgur.com/lmU0T1G.jpg',
    },
    {
      userId: User2._id,
      eventCategoryId: eventCategories3._id,
      title: 'Book Club Meeting',
      description: 'Discuss the latest novel with fellow book lovers.',
      startDate: new Date('2023-11-20T19:00:00'), // November 20, 2023, 7:00 PM
      endDate: new Date('2023-11-20T21:00:00'), // November 20, 2023, 9:00 PM
      privacyLevel: 'Private',
      location: 'Cozy Café',
      image: 'https://i.imgur.com/m8p5rZ1.jpg',
    }, 
    {
      userId: User1._id,
      eventCategoryId: eventCategories2._id,
      title: 'Tech Meetup',
      description: 'Networking and discussions on the latest tech trends.',
      startDate: new Date('2023-11-25T17:30:00'), // November 25, 2023, 5:30 PM
      endDate: new Date('2023-11-25T20:00:00'), // November 25, 2023, 8:00 PM
      privacyLevel: 'Public',
      location: 'Innovation Hub',
      image: 'https://i.imgur.com/MHJceM7.jpg',
    },
    {
      userId: User3._id,
      eventCategoryId: eventCategories1._id,
      title: 'Art Exhibition',
      description: 'Explore the world of contemporary art.',
      startDate: new Date('2023-12-01T14:00:00'), // December 1, 2023, 2:00 PM
      endDate: new Date('2023-12-01T18:00:00'), // December 1, 2023, 6:00 PM
      privacyLevel: 'Public',
      location: 'Modern Art Gallery',
      image: 'https://i.imgur.com/Xrl7V3D.jpg',
    },
    {
      userId: User2._id,
      eventCategoryId: eventCategories3._id,
      title: 'Fitness Challenge',
      description: 'Join a fun and energetic fitness event for all levels.',
      startDate: new Date('2023-12-05T09:00:00'), // December 5, 2023, 9:00 AM
      endDate: new Date('2023-12-05T11:00:00'), // December 5, 2023, 11:00 AM
      privacyLevel: 'Public',
      location: 'City Park',
      image: 'https://i.imgur.com/6I8yxBz.jpg',
    },
    {
      userId: User3._id,
      eventCategoryId: eventCategories1._id,
      title: 'Coding Bootcamp Graduation',
      description: 'Celebrate the achievements of coding bootcamp graduates.',
      startDate: new Date('2023-12-10T15:00:00'), // December 10, 2023, 3:00 PM
      endDate: new Date('2023-12-10T18:00:00'), // December 10, 2023, 6:00 PM
      privacyLevel: 'Public',
      location: 'Tech Academy Auditorium',
      image: 'https://i.imgur.com/gHvfu9F.jpg',
    },
    {
      userId: User2._id,
      eventCategoryId: eventCategories2._id,
      title: 'Book Club Meeting',
      description: 'Discuss the latest bestseller with fellow book enthusiasts.',
      startDate: new Date('2023-12-15T19:00:00'), // December 15, 2023, 7:00 PM
      endDate: new Date('2023-12-15T21:00:00'), // December 15, 2023, 9:00 PM
      privacyLevel: 'Public',
      location: 'Local Library',
      image: 'https://i.imgur.com/4QeHRg4.jpg',
    },
    {
      userId: User1._id,
      eventCategoryId: eventCategories3._id,
      title: 'Holiday Jazz Concert',
      description: 'Enjoy a festive evening with live jazz music and holiday cheer.',
      startDate: new Date('2023-12-20T20:00:00'), // December 20, 2023, 8:00 PM
      endDate: new Date('2023-12-20T23:00:00'), // December 20, 2023, 11:00 PM
      privacyLevel: 'Public',
      location: 'City Concert Hall',
      image: 'https://i.imgur.com/zcYnNWp.jpg',
    },
    {
      userId: User3._id,
      eventCategoryId: eventCategories1._id,
      title: 'Startup Pitch Night',
      description: 'Witness innovative startup pitches and network with entrepreneurs.',
      startDate: new Date('2023-12-25T18:30:00'), // December 25, 2023, 6:30 PM
      endDate: new Date('2023-12-25T21:00:00'), // December 25, 2023, 9:00 PM
      privacyLevel: 'Public',
      location: 'Startup Hub',
      image: 'https://i.imgur.com/mw7h1JX.jpg',
    },
    {
      userId: User2._id,
      eventCategoryId: eventCategories2._id,
      title: 'Gaming Tournament',
      description: 'Compete in a thrilling gaming tournament with friends and prizes.',
      startDate: new Date('2024-01-02T12:00:00'), // January 2, 2024, 12:00 PM
      endDate: new Date('2024-01-02T18:00:00'), // January 2, 2024, 6:00 PM
      privacyLevel: 'Public',
      location: 'Gaming Arena',
      image: 'https://i.imgur.com/Ll3R2Jw.jpg',
    },
    {
      userId: User3._id,
      eventCategoryId: eventCategories3._id,
      title: 'Cooking Class: Italian Cuisine',
      description: 'Learn to cook delicious Italian dishes from a professional chef.',
      startDate: new Date('2024-01-08T16:00:00'), // January 8, 2024, 4:00 PM
      endDate: new Date('2024-01-08T18:30:00'), // January 8, 2024, 6:30 PM
      privacyLevel: 'Public',
      location: 'Culinary Studio',
      image: 'https://i.imgur.com/7CZ2KLC.jpg',
    },
    {
      userId: User2._id,
      eventCategoryId: eventCategories1._id,
      title: 'Science Fair for Kids',
      description: 'Encourage young minds with exciting science experiments and projects.',
      startDate: new Date('2024-01-15T14:00:00'), // January 15, 2024, 2:00 PM
      endDate: new Date('2024-01-15T16:30:00'), // January 15, 2024, 4:30 PM
      privacyLevel: 'Public',
      location: "Children's Science Museum",
      image: 'https://i.imgur.com/JXPWs7o.jpg',
    },
    {
      userId: User1._id,
      eventCategoryId: eventCategories2._id,
      title: 'Yoga and Meditation Retreat',
      description: 'Relax and rejuvenate with a weekend yoga and meditation retreat.',
      startDate: new Date('2024-01-22T09:00:00'), // January 22, 2024, 9:00 AM
      endDate: new Date('2024-01-24T16:00:00'), // January 24, 2024, 4:00 PM
      privacyLevel: 'Private',
      location: 'Serene Mountainside Retreat',
      image: 'https://i.imgur.com/tLfPUZz.jpg',
    },
    {
      userId: User3._id,
      eventCategoryId: eventCategories3._id,
      title: 'Photography Workshop',
      description: 'Enhance your photography skills with hands-on lessons from experts.',
      startDate: new Date('2024-02-01T13:00:00'), // February 1, 2024, 1:00 PM
      endDate: new Date('2024-02-01T16:00:00'), // February 1, 2024, 4:00 PM
      privacyLevel: 'Public',
      location: 'Artistic Photography Studio',
      image: 'https://i.imgur.com/ro7XCzM.jpg',
    },
    
  {
    userId: User2._id,
    eventCategoryId: eventCategories1._id,
    title: 'Tech Workshop',
    description: 'Hands-on workshop on the latest web development technologies.',
    startDate: new Date('2023-11-15T14:00:00'), // November 15, 2023, 2:00 PM
    endDate: new Date('2023-11-15T17:00:00'), // November 15, 2023, 5:00 PM
    privacyLevel: 'Public',
    location: 'Tech Hub',
    image: 'https://i.imgur.com/1Dv2sZL.jpg',
  },
  {
    userId: User1._id,
    eventCategoryId: eventCategories2._id,
    title: 'Book Club Meeting',
    description: 'Discussing the latest bestseller with fellow book enthusiasts.',
    startDate: new Date('2023-11-20T18:30:00'), // November 20, 2023, 6:30 PM
    endDate: new Date('2023-11-20T21:00:00'), // November 20, 2023, 9:00 PM
    privacyLevel: 'Public',
    location: 'Local Library',
    image: 'https://i.imgur.com/pbqPY6S.jpg',
  },
  {
    userId: User3._id,
    eventCategoryId: eventCategories3._id,
    title: 'Cooking Class',
    description: 'Learn to cook delicious meals from a professional chef.',
    startDate: new Date('2023-11-22T16:00:00'), // November 22, 2023, 4:00 PM
    endDate: new Date('2023-11-22T18:00:00'), // November 22, 2023, 6:00 PM
    privacyLevel: 'Public',
    location: 'Culinary Institute',
    image: 'https://i.imgur.com/jz0JGs7.jpg',
  },
  {
    userId: User2._id,
    eventCategoryId: eventCategories1._id,
    title: 'Music Concert',
    description: 'Enjoy a night of live music featuring local bands.',
    startDate: new Date('2023-11-28T19:00:00'), // November 28, 2023, 7:00 PM
    endDate: new Date('2023-11-28T22:00:00'), // November 28, 2023, 10:00 PM
    privacyLevel: 'Public',
    location: 'Outdoor Amphitheater',
    image: 'https://i.imgur.com/1d4zmNL.jpg',
  },
  {
    userId: User1._id,
    eventCategoryId: eventCategories2._id,
    title: 'Gaming Tournament',
    description: 'Compete in a thrilling gaming tournament with cash prizes.',
    startDate: new Date('2023-12-02T20:00:00'), // December 2, 2023, 8:00 PM
    endDate: new Date('2023-12-02T23:00:00'), // December 2, 2023, 11:00 PM
    privacyLevel: 'Public',
    location: 'Gaming Arena',
    image: 'https://i.imgur.com/ab8YmDz.jpg',
  },
  {
    userId: User3._id,
    eventCategoryId: eventCategories3._id,
    title: 'Dance Workshop',
    description: 'Learn new dance moves in a fun and energetic workshop.',
    startDate: new Date('2023-12-08T15:00:00'), // December 8, 2023, 3:00 PM
    endDate: new Date('2023-12-08T17:00:00'), // December 8, 2023, 5:00 PM
    privacyLevel: 'Public',
    location: 'Dance Studio',
    image: 'https://i.imgur.com/V6avUtu.jpg',
  },
  {
    userId: User2._id,
    eventCategoryId: eventCategories1._id,
    title: 'Local Farmers Market',
    description: 'Explore fresh produce and handmade crafts at the farmers market.',
    startDate: new Date('2023-12-12T09:00:00'), // December 12, 2023, 9:00 AM
    endDate: new Date('2023-12-12T13:00:00'), // December 12, 2023, 1:00 PM
    privacyLevel: 'Public',
    location: 'City Square',
    image: 'https://i.imgur.com/XYmMR1H.jpg',
  },
  {
    userId: User1._id,
    eventCategoryId: eventCategories2._id,
    title: 'Photography Exhibition',
    description: 'Discover stunning visuals at a showcase of local photography talent.',
    startDate: new Date('2023-12-16T17:00:00'), // December 16, 2023, 5:00 PM
    endDate: new Date('2023-12-16T20:00:00'), // December 16, 2023, 8:00 PM
    privacyLevel: 'Public',
    location: 'Art Gallery',
    image: 'https://i.imgur.com/2g3fYk4.jpg',
  },
  {
    userId: User3._id,
    eventCategoryId: eventCategories3._id,
    title: 'Nature Hike',
    description: 'Embark on a scenic hike through beautiful trails and nature reserves.',
    startDate: new Date('2023-12-20T10:00:00'), // December 20, 2023, 10:00 AM
    endDate: new Date('2023-12-20T13:00:00'), // December 20, 2023, 1:00 PM
    privacyLevel: 'Public',
    location: 'Nature Park',
    image: 'https://i.imgur.com/snlWQR0.jpg',
  },
  {
    userId: User2._id,
    eventCategoryId: eventCategories1._id,
    title: 'Art Workshop',
    description: 'Express your creativity in a hands-on art workshop.',
    startDate: new Date('2024-01-05T15:00:00'), // January 5, 2024, 3:00 PM
    endDate: new Date('2024-01-05T18:00:00'), // January 5, 2024, 6:00 PM
    privacyLevel: 'Public',
    location: 'Art Studio',
    image: 'https://www.example.com/path/to/your/image1.pdf',
  },
  {
    userId: User3._id,
    eventCategoryId: eventCategories2._id,
    title: 'Technology Conference',
    description: 'Explore the latest advancements in technology with industry experts.',
    startDate: new Date('2024-01-10T09:00:00'), // January 10, 2024, 9:00 AM
    endDate: new Date('2024-01-10T17:00:00'), // January 10, 2024, 5:00 PM
    privacyLevel: 'Public',
    location: 'Tech Convention Center',
    image: 'https://www.example.com/path/to/your/image2.pdf',
  },
  {
    userId: User2._id,
    eventCategoryId: eventCategories3._id,
    title: 'Local Band Concert',
    description: 'Enjoy live music from talented local bands.',
    startDate: new Date('2024-01-15T19:30:00'), // January 15, 2024, 7:30 PM
    endDate: new Date('2024-01-15T22:00:00'), // January 15, 2024, 10:00 PM
    privacyLevel: 'Public',
    location: 'Community Hall',
    image: 'https://www.example.com/path/to/your/image3.pdf',
  },
  {
    userId: User1._id,
    eventCategoryId: eventCategories1._id,
    title: 'Yoga in the Park',
    description: 'Relax and rejuvenate with a yoga session in the local park.',
    startDate: new Date('2024-01-20T08:00:00'), // January 20, 2024, 8:00 AM
    endDate: new Date('2024-01-20T10:00:00'), // January 20, 2024, 10:00 AM
    privacyLevel: 'Public',
    location: 'City Park',
    image: 'https://www.example.com/path/to/your/image4.pdf',
  },
  {
    userId: User3._id,
    eventCategoryId: eventCategories2._id,
    title: 'Trivia Night',
    description: 'Test your knowledge and compete in a fun-filled trivia night.',
    startDate: new Date('2024-01-25T19:00:00'), // January 25, 2024, 7:00 PM
    endDate: new Date('2024-01-25T21:00:00'), // January 25, 2024, 9:00 PM
    privacyLevel: 'Public',
    location: 'Local Pub',
    image: 'https://www.example.com/path/to/your/image5.pdf',
  },
  {
    userId: User2._id,
    eventCategoryId: eventCategories3._id,
    title: 'Charity Run',
    description: 'Join the community in a charity run to support a good cause.',
    startDate: new Date('2024-01-30T11:00:00'), // January 30, 2024, 11:00 AM
    endDate: new Date('2024-01-30T14:00:00'), // January 30, 2024, 2:00 PM
    privacyLevel: 'Public',
    location: 'City Streets',
    image: 'https://www.example.com/path/to/your/image6.pdf',
  },
  {
    userId: User1._id,
    eventCategoryId: eventCategories1._id,
    title: 'DIY Workshop',
    description: 'Learn to create your own DIY projects with expert guidance.',
    startDate: new Date('2024-02-05T14:00:00'), // February 5, 2024, 2:00 PM
    endDate: new Date('2024-02-05T17:00:00'), // February 5, 2024, 5:00 PM
    privacyLevel: 'Public',
    location: 'Community Center',
    image: 'https://www.example.com/path/to/your/image7.pdf',
  },
  {
    userId: User3._id,
    eventCategoryId: eventCategories2._id,
    title: 'Movie Night',
    description: 'Enjoy a movie night under the stars with friends and family.',
    startDate: new Date('2024-02-10T19:30:00'), // February 10, 2024, 7:30 PM
    endDate: new Date('2024-02-10T22:00:00'), // February 10, 2024, 10:00 PM
    privacyLevel: 'Public',
    location: 'Outdoor Cinema',
    image: 'https://www.example.com/path/to/your/image8.pdf',
  },
  {
    userId: User2._id,
    eventCategoryId: eventCategories3._id,
    title: 'Culinary Festival',
    description: 'Indulge in a variety of culinary delights from local chefs and vendors.',
    startDate: new Date('2024-02-15T12:00:00'), // February 15, 2024, 12:00 PM
    endDate: new Date('2024-02-15T16:00:00'), // February 15, 2024, 4:00 PM
    privacyLevel: 'Public',
    location: 'Food Park',
    image: 'https://www.example.com/path/to/your/image9.pdf',
  },
  {
    userId: User1._id,
    eventCategoryId: eventCategories1._id,
    title: 'Tech Talk',
    description: 'Engage in insightful discussions on the latest tech trends.',
    startDate: new Date('2024-02-20T18:00:00'), // February 20, 2024, 6:00 PM
    endDate: new Date('2024-02-20T20:00:00'), // February 20, 2024, 8:00 PM
    privacyLevel: 'Public',
    location: 'Innovation Hub',
    image: 'https://www.example.com/path/to/your/image10.pdf',
  },
  {
    userId: User3._id,
    eventCategoryId: eventCategories2._id,
    title: 'Virtual Reality Expo',
    description: 'Immerse yourself in the latest virtual reality experiences at this expo.',
    startDate: new Date('2024-02-25T15:00:00'), // February 25, 2024, 3:00 PM
    endDate: new Date('2024-02-25T18:00:00'), // February 25, 2024, 6:00 PM
    privacyLevel: 'Public',
    location: 'VR Convention Center',
    image: 'https://www.example.com/path/to/your/image11.pdf',
  },
  {
    userId: User1._id,
    eventCategoryId: eventCategories3._id,
    title: 'Nature Photography Workshop',
    description: 'Capture the beauty of nature with tips from professional photographers.',
    startDate: new Date('2024-03-01T10:00:00'), // March 1, 2024, 10:00 AM
    endDate: new Date('2024-03-01T13:00:00'), // March 1, 2024, 1:00 PM
    privacyLevel: 'Public',
    location: 'Nature Reserve',
    image: 'https://www.example.com/path/to/your/image12.pdf',
  },
  {
    userId: User2._id,
    eventCategoryId: eventCategories1._id,
    title: 'Board Game Night',
    description: 'Join us for a night of friendly competition and board game fun.',
    startDate: new Date('2024-03-06T19:00:00'), // March 6, 2024, 7:00 PM
    endDate: new Date('2024-03-06T22:00:00'), // March 6, 2024, 10:00 PM
    privacyLevel: 'Public',
    location: 'Game Cafe',
    image: 'https://www.example.com/path/to/your/image13.pdf',
  },
  {
    userId: User3._id,
    eventCategoryId: eventCategories2._id,
    title: 'Local Art Exhibition',
    description: 'Discover and appreciate the talents of local artists at this exhibition.',
    startDate: new Date('2024-03-12T14:00:00'), // March 12, 2024, 2:00 PM
    endDate: new Date('2024-03-12T18:00:00'), // March 12, 2024, 6:00 PM
    privacyLevel: 'Public',
    location: 'Art Gallery',
    image: 'https://www.example.com/path/to/your/image14.pdf',
  },
  {
    userId: User1._id,
    eventCategoryId: eventCategories3._id,
    title: 'Fitness Bootcamp',
    description: 'Get ready for an intense fitness session with professional trainers.',
    startDate: new Date('2024-03-18T08:00:00'), // March 18, 2024, 8:00 AM
    endDate: new Date('2024-03-18T10:00:00'), // March 18, 2024, 10:00 AM
    privacyLevel: 'Public',
    location: 'Fitness Park',
    image: 'https://www.example.com/path/to/your/image15.pdf',
  },
  {
    userId: User2._id,
    eventCategoryId: eventCategories1._id,
    title: 'Science Fair for Kids',
    description: 'Encourage young minds with interactive science exhibits and experiments.',
    startDate: new Date('2024-03-24T11:00:00'), // March 24, 2024, 11:00 AM
    endDate: new Date('2024-03-24T15:00:00'), // March 24, 2024, 3:00 PM
    privacyLevel: 'Public',
    location: 'Community Center',
    image: 'https://www.example.com/path/to/your/image16.pdf',
  },
  {
    userId: User3._id,
    eventCategoryId: eventCategories2._id,
    title: 'Live Comedy Show',
    description: 'Laugh the night away with performances from top comedians.',
    startDate: new Date('2024-03-30T20:00:00'), // March 30, 2024, 8:00 PM
    endDate: new Date('2024-03-30T22:00:00'), // March 30, 2024, 10:00 PM
    privacyLevel: 'Public',
    location: 'Comedy Club',
    image: 'https://www.example.com/path/to/your/image17.pdf',
  },
  {
    userId: User1._id,
    eventCategoryId: eventCategories3._id,
    title: 'Historical Walking Tour',
    description: 'Explore the history of the city with a guided walking tour.',
    startDate: new Date('2024-04-05T13:00:00'), // April 5, 2024, 1:00 PM
    endDate: new Date('2024-04-05T16:00:00'), // April 5, 2024, 4:00 PM
    privacyLevel: 'Public',
    location: 'City Heritage Trail',
    image: 'https://www.example.com/path/to/your/image18.pdf',
  },
  {
    userId: User2._id,
    eventCategoryId: eventCategories1._id,
    title: 'Fashion Show',
    description: 'Experience the latest trends in fashion with a glamorous runway show.',
    startDate: new Date('2024-04-10T18:00:00'), // April 10, 2024, 6:00 PM
    endDate: new Date('2024-04-10T21:00:00'), // April 10, 2024, 9:00 PM
    privacyLevel: 'Public',
    location: 'Fashion Mall',
    image: 'https://www.example.com/path/to/your/image19.pdf',
  },
  {
    userId: User3._id,
    eventCategoryId: eventCategories2._id,
    title: 'Gardening Workshop',
    description: 'Learn the art of gardening and plant care with expert guidance.',
    startDate: new Date('2024-04-15T14:00:00'), // April 15, 2024, 2:00 PM
    endDate: new Date('2024-04-15T17:00:00'), // April 15, 2024, 5:00 PM
    privacyLevel: 'Public',
    location: 'Botanical Gardens',
    image: 'https://www.example.com/path/to/your/image20.pdf',
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
