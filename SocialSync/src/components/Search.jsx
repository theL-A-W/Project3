import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DataContext from '../DataContext';

export default function Search() {
  const navigate = useNavigate()
  const { eventDetailData, seteventDetailData, searchResultsData, setSearchResultsData, searchDisplay, setSearchDisplay} = useContext(DataContext)
  const [searchName, setSearchName] = useState('')
 

  const handleSubmit = async (e) => {
    // navigate(`/NavSearch`);
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3001/Events/search?name=${searchName}`);
      setSearchResultsData(response.data);
      setSearchDisplay(response.data);
      console.log(setSearchDisplay)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  console.log(searchName)
  const showEvent = (eventId) => {
    navigate(`/eventdetails/${eventId}`);
    console.log('Event ID:', eventId);
  }

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
                {event.image ? (
                <img className="event-image" src={event.image} alt={`Image for ${event.title}`} />
              ) : (
                <img className="event-image" src="https://www.somaiya.edu/assets/research-branding/img/homepage/events-default.jpg" alt="Default Image" />
              )}
              </div>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}