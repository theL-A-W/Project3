import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DataContext from '../../DataContext';

export default function EventDetails() {
  const { eventDetailData, seteventDetailData, searchResultsData, setSearchResultsData, searchDisplay, setSearchDisplay } = useContext(DataContext);
   
  const { id } = useParams(); // This will give you the event ID from the URL

  useEffect(() => {
    // Make a GET request to your API endpoint with the event ID
    axios.get(`http://localhost:3001/events/${id}`)
      .then((response) => {
        // Update the eventDetailData state with the fetched event details
        seteventDetailData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching event details:', error);
      });
  }, [id]);

  return (
    <div className="eventDetails">
      <h4>Event Details</h4>
      <div>
        <h2>{eventDetailData.title}</h2>
        <p>{eventDetailData.description}</p>
        <p>Start Date: {eventDetailData.startDate}</p>
        <p>End Date: {eventDetailData.endDate}</p>
        <p>Privacy Level: {eventDetailData.privacyLevel}</p>
        <p>Location: {eventDetailData.location}</p>
      </div>
    </div>
  );
}
