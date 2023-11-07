import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';

const PublicCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch the public events from the backend
    axios.get('/api/public-events')
      .then(response => {
        // Backend needs to return an array of event objects
        setEvents(response.data);
      })
      .catch(error => {
        console.error("Error fetching public events:", error);
      });
  }, []);

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={events}
    />
  );
};

export default PublicCalendar;
