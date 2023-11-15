import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import axios from 'axios'
import React, { useState, useEffect } from 'react'

export default function EventDetails ({ event, onHide}){
    const [modalShow, setModalShow] = useState(false)
    const [eventDetails, setEventDetails] = useState([])
    const [currentEvents, setCurrentEvents] = useState([])



//AXIOS CALL
    useEffect(() => {
      const getEvents = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/Event/${event.id}`)
          console.log(response.data)
          setEventDetails(response.data)
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }
      getEvents()
    }, [event.id])
    // console.log(modalShow)



//DELETE EVENT
const handleDeleteEvent =()=>{
  const deleteEvents = async () => {
    try {
      const response = await axios.delete(`http://localhost:3001/event/${event.id}`)
    } catch (error) {
      console.error('Error deleting data:', error)
    }
  }
  deleteEvents()
  window.location.reload()
}


    useEffect(() => {
      setModalShow(true);
    }, [event]);



    function MyVerticallyCenteredModal(props) {
        return (
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton id="modal-body">
              <Modal.Title id="contained-modal-title-vcenter">
                Event Details
              </Modal.Title>
            </Modal.Header>
            <Modal.Body id="modal-body">
{/* EVENT TITLE POPULATES HERE */}
               <h4>{event.title}</h4> 
{/* EVENT START DATE */}
<div className='event-start-date'>
                    <label className='event-details-label'>Event Start Date:</label>
                    <p className='event-text-display'>{eventDetails.startDate}</p>
              </div>
{/* EVENT END DATE */}
<div className='event-end-date'>
                    <label className='event-details-label'>Event End Date:</label>
                    <p className='event-text-display'>{eventDetails.endDate}</p>
              </div>
{/* EVENT PRIVACY LEVEL */}
<div className='event-privacy-level'>
                    <label className='event-details-label'>Event Privacy Level:</label>
                    <p className='event-text-display'>{eventDetails.privacyLevel}</p>
              </div>
{/* EVENT LOCATION */}
<div className='event-location'>
                    <label className='event-details-label'>Event Location:</label>
                    <p className='event-text-display'>{eventDetails.location}</p>
              </div>
{/* EVENT DETAILS */}
                <div className='event-description'>
                    <label className='event-details-label'>Event Description:</label>
                    <p className='event-text-display'>
                        {eventDetails.description}
                    </p>
                </div>

            </Modal.Body>
            <Modal.Footer id="modal-body">
            <Button variant="secondary" >
            Edit
          </Button>
          <Button variant="danger" onClick={() => { handleDeleteEvent(); props.onHide() }}>
            Delete
          </Button>
              <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        );
      }



    return (
        

        <div className="eventDetails">
            {/* <button variant="primary" onClick={() => setModalShow(true)}>Event Details</button> */}
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            
        </div>
)
}