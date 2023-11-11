import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DataContext from '../DataContext';

export default function Search() {
  const navigate = useNavigate();
  const { setSearchResultsData } = useContext(DataContext);
  const [searchName, setSearchName] = useState('');
  const [searchDisplay, setSearchDisplay] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3001/event?name=${searchName}`);
      setSearchDisplay(response.data.results);
      navigate(`/NavSearch`);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const showEvent = (eventId) => {
    navigate(`/eventdetails/${eventId}`);
    console.log('Event ID:', eventId);
  };

  return (
    <div className="search">
      <form onSubmit={handleSubmit}>
        <input
          className='search-input'
          type="text"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          placeholder="Enter event name"
        />
        <button id="submit-search" type="submit">
          Enter
        </button>
      </form>

      {searchDisplay && searchDisplay.length > 0 ? (
        <>
          <h1 className="title">List of Events</h1>
          <div className="event-card-container">
            {searchDisplay.map((event) => (
              <div key={event._id} onClick={() => showEvent(event._id)} className="eventId-Card">
                <h3>{event.title}</h3>
              </div>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}