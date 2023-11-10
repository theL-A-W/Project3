import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DataContext from '../DataContext';

export default function Search() {
  const navigate = useNavigate();
  const { eventDetailData, searchResultsData, setSearchResultsData, searchDisplay, setSearchDisplay } = useContext(DataContext);
  const [searchName, setSearchName] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleNameSubmit = async (e) => {
    e.preventDefault();
    if (searchName) {
      setSearchDisplay(searchName);
      GetEventsByName(searchName);
      setFormSubmitted(true); // Set formSubmitted to true on submit
    }
  }

  const GetEventsByName = async (name) => {
    try {
      const response = await axios.get(`http://localhost:3001/events`);
      setSearchResultsData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
    <div className="search">
      <form onSubmit={handleNameSubmit}>
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

      {formSubmitted && ( // Render only if formSubmitted is true
        <div className="search-results-container">
          {searchResultsData && searchResultsData.length > 0 ? (
            <div className='search-results'>
              <div className='search-results-query'>Showing results for "{searchDisplay}"</div>
              <div className='search-results-grid'>
                {searchResultsData.map((event, index) => (
                  <div className='search-results-grid-item' key={event._id} onClick={() => eventDetailsByID(event._id)}>
                    <h2 className='event-title'>{event.title}</h2>
                    <p className='event-description'>{event.description}</p>
                    <p className='event-start-date'>Start Date: {event.startDate}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
