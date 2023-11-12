const PORT = process.env.PORT || 3001
const db = require('./db/index.js')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const logger = require('morgan')
// const session = require('express-session');
// const { auth } = require('express-oauth2-jwt-bearer');
// require('dotenv').config();
// const { auth } = require('express-openid-connect');
// // require('dotenv').config({ path: './path/to/your/.env' });
// require('dotenv').config();


// include controller name and path here
const userController = require('./controllers/UserController.js')
const profileController = require('./controllers/profileController.js')
const eventCategoryController = require('./controllers/eventCategoryController.js')
const eventController = require('./controllers/eventController.js')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(logger('dev'))
// app.use(session({
//   secret: 'FKQsgv7oNIwOxH7zGTXt1V1MV5EAXwXtTmR_-7_k-zttj770XohZEWKvDj1S8mj8',
//   resave: false,
//   saveUninitialized: false
// }));

// app.post('/sessions', (req, res) => {
//   const userId = req.body.userId;
// console.log(userId)
//   req.session.userId = userId; 

//   res.sendStatus(200);
// });

// app.get('/api/profile', (req, res) => {
//   const userId = req.session.userId;
  
  
// });

// // As example Routes that require authentication
// app.get('/profile', (req, res) => {
//   const userId = req.session.userId;
//   // This will require the user to be authenticated
//   if (req.oidc.isAuthenticated()) {
//     res.send('Profile Page');
//   } else {
//     res.oidc.login({ returnTo: '/profile' });
//   }
// });

// // Auth0 Middleware setup

// const authConfig = {
//   authRequired: false,
//   auth0Logout: true,
//   secret: process.env.SECRET, // Your secret - set this in your .env file
//   baseURL: 'http://localhost:' + PORT, // Your baseURL
//   clientID: process.env.CLIENT_ID, // Your Auth0 client ID - set this in your .env file
//   issuerBaseURL: process.env.ISSUER_BASE_URL // Your Auth0 domain - set this in your .env file
// };

// app.use(auth(authConfig));


// Auth0 JWT middleware setup

// const jwtCheck = auth({
//   audience: 'http://localhost:5173/usercalendar',
//   issuerBaseURL: 'https://dev-dpd2qltyiiv1uqud.us.auth0.com/',
//   tokenSigningAlg: 'RS256'
// });

// // Enforce JWT check on all endpoints (you might want to apply this only to secured endpoints)
// app.use(jwtCheck);

// Auth0 Middleware setup
// const authConfig = {
//   authRequired: false,
//   auth0Logout: true,
//   secret: process.env.SECRET, // Your secret - set this in your .env file
//   baseURL: 'http://localhost:' + PORT, // Your baseURL
//   clientID: process.env.CLIENT_ID, // Your Auth0 client ID - set this in your .env file
//   issuerBaseURL: process.env.ISSUER_BASE_URL // Your Auth0 domain - set this in your .env file
// };

// app.use(auth(authConfig));


//Routes
app.get('/Users', userController.getAllUsers)
app.get('/Profiles', profileController.getAllProfiles)
app.get('/EventCategories', eventCategoryController.getAllEventCategories)
app.get('/Event', eventController.getAllEvents)
// New route to search events by name
app.get('/Events/search', eventController.searchEventsByName);

app.get('/user/:auth0Id', userController.getUserWithAuth0Id);
app.get('/User/:id', userController.getOneUser)
app.get('/Profile/:id', profileController.getOneProfile)
app.get('/EventCategory/:id', eventCategoryController.getOneEventCategory)
app.get('/Event/:id', eventController.getOneEvent)

app.post('/User', userController.createUser)
app.post('/Profile', profileController.createProfile)
app.post('/EventCategory', eventCategoryController.createEventCategory)
app.post('/Event', eventController.createEvent)

app.put('/User/:id', userController.updateUser)
app.put('/Profile/:id', profileController.updateProfile)
app.put('/EventCategory/:id', eventCategoryController.updateEventCategory)
app.put('/Event/:id', eventController.updateEvent)

app.delete('/User/:id', userController.deleteUser);
app.delete('/Profile/:id', profileController.deleteProfile);
app.delete('/EventCategory/:id', eventCategoryController.deleteEventCategory);
app.delete('/event/:id', eventController.deleteEvent);

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

