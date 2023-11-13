import React, { useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import DataContext from '../../DataContext';

export default function EventDetailsData() {
  const { eventDetailData, seteventDetailData } = useContext(DataContext);
  const { id } = useParams();

  useEffect(() => {
    const getEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/event/${id}`);
        seteventDetailData(response.data);
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    getEvent();
  }, [id, seteventDetailData]);

  return eventDetailData ? (
    <div className="eventDetails">
      <h2>Event Details</h2>
      <div>
        <h4>{eventDetailData.title}</h4>
        <p>{eventDetailData.description}</p>
        <p>Start Date: {eventDetailData.startDate}</p>
        <p>End Date: {eventDetailData.endDate}</p>
        <p>Privacy Level: {eventDetailData.privacyLevel}</p>
        <p>Location: {eventDetailData.location}</p>
      </div>
      <button>
        <Link to="/NavSearch"> Back to Event Search List</Link>
      </button>
    </div>
  ) : (
    <h3>Finding Events...</h3>
  );
}
