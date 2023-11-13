import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DataContext from '../DataContext';
import Modal from 'react-bootstrap/Modal'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';

export default function Search() {
  const navigate = useNavigate()
  const { eventDetailData, seteventDetailData, searchResultsData, setSearchResultsData, searchDisplay, setSearchDisplay} = useContext(DataContext)
  const [searchName, setSearchName] = useState('')


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);


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
        <button id="submit-search" type="submit" onClick={handleShow}>
          Enter
        </button>
      </form>

      {searchDisplay && searchDisplay.length > 0 ? (
        <>
        <Modal
        show={show}
        backdrop="static"
        onHide={handleClose}
        className="search-modal"
        keyboard={false}
        size= "lg"
        >
             <Modal.Header closeButton id="modal-body">
             <Modal.Title className="title">List of Events</Modal.Title>
          </Modal.Header>
          <div className="event-card-container">
          <Modal.Body id="modal-body">
            {searchDisplay.map((event, props) => (

              <div key={event._id} onClick={() => showEvent(event._id)} className="eventId-Card">

          <Card style={{ width: '18rem' }}>
                {event.image ? (
                <Card.Img variant="top" className="event-image" src={event.image} alt={`Image for ${event.title}`} />
              ) : (
                <Card.Img variant="top" className="event-image" src="https://www.somaiya.edu/assets/research-branding/img/homepage/events-default.jpg" alt="Default Image" />
              )}
                        <Card.Body>
                          <Card.Title>{event.title}</Card.Title>
                          <Card.Text>
                          {event.description}
                          </Card.Text>
                        </Card.Body>
          </Card>

              </div>
            ))}
                              </Modal.Body>
                  <Modal.Footer id="modal-body">
              <Button onClick={handleClose}>Close</Button>
            </Modal.Footer>
          </div>
          
          </Modal>
        </>
      ) : null}
    </div>
  );
}