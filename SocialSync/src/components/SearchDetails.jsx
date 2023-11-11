// import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import DataContext from '../DataContext';

// export default function SearchDetails() {
//   const navigate = useNavigate();
//   const { setSearchDisplay } = useContext(DataContext);

//   useEffect(() => {
//     const getEvents = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3001/event`);
//         setSearchDisplay(response.data.results);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//     getEvents();
//   }, [setSearchDisplay]);

//   const showEvent = (eventId) => {
//     navigate(`/eventdetails/${eventId}`);
//   };
  

//   return searchDisplay ? (
//     <>
//       <h1 className="title">List of Events</h1>
//       <div className="event-card-container">
//         {searchDisplay.map((event) => (
//           <div key={event._id} onClick={() => showEvent(event._id)} className="eventId-Card">
//             <h3>{event.name}</h3>
//           </div>
//         ))}
//       </div>
//     </>
//   ) : (
//     <h3>Loading Events, Please Wait...</h3>
//   );
// }
