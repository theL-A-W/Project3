const PORT = process.env.PORT || 3001
const db = require('./db/index.js')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const logger = require('morgan')

// include controller name and path here
const userController = require('./controllers/userController.js')
const profileController = require('./controllers/profileController.js')
const eventCategoryController = require('./controllers/eventCategoryController.js')
const eventController = require('./controllers/eventController.js')
const friendshipController = require('./controllers/friendshipController.js')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(logger('dev'))

// User routes
app.get('/Users', userController.getAllUsers);
app.get('/users/search', userController.searchUsersByEmail);
app.post('/User', userController.createUser);
app.put('/User/:id', userController.updateUser);
app.delete('/User/:id', userController.deleteUser);
app.get('/searchByEmail', userController.searchUsersByEmail);
app.get('/User/:auth0Id', userController.getUserWithAuth0Id);

// Profile routes
app.get('/Profiles', profileController.getAllProfiles);
app.get('/Profile/:id', profileController.getOneProfile);
app.post('/Profile', profileController.createProfile);
app.put('/Profile/:id', profileController.updateProfile);
app.delete('/Profile/:id', profileController.deleteProfile);

// Event and Event Category routes
app.get('/EventCategories', eventCategoryController.getAllEventCategories);
app.get('/EventCategory/:id', eventCategoryController.getOneEventCategory);
app.post('/EventCategory', eventCategoryController.createEventCategory);
app.put('/EventCategory/:id', eventCategoryController.updateEventCategory);
app.delete('/EventCategory/:id', eventCategoryController.deleteEventCategory);

app.get('/Events', eventController.getAllEvents);
app.get('/Event/:id', eventController.getOneEvent);
app.post('/Event', eventController.createEvent);
app.put('/Event/:id', eventController.updateEvent);
app.delete('/event/:id', eventController.deleteEvent);
app.get('/Events/search', eventController.searchEventsByName);

// Friendship routes
app.post('/friendships/request', friendshipController.sendFriendRequest);
app.put('/friendships/accept/:requestId', friendshipController.acceptFriendRequest);
app.put('/friendships/reject/:requestId', friendshipController.rejectFriendRequest);
app.get('/friendships/pending/:auth0Id', friendshipController.getPendingRequests);
// app.get('/friendships/friends', friendshipController.getFriendsList);
app.get('/friendships/friends/:auth0Id', friendshipController.getFriendsList);
app.put('/friendships/', friendshipController.deleteFriendship);

// Route to search Users by first and last name
// app.get('/User/:firstName', UserController.getUserByfName);


app.get('/', (req, res) => {
    res.send('Landing root!!')
  })


  //Static Files
app.use(express.static('ProfileFE')); //static pages

// // Templating Engine
// app.use(expressLayout);

app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`)
  })  

