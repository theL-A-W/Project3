import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import axios from 'axios'
import React, { useState, useEffect } from 'react'

export default function EventDetails ( event, onHide){
    const [modalShow, setModalShow] = useState(false)

//USE THIS OR USECONTEXT TO SEND EVENT DATA FROM CALENDAR AXIOS CALL


//AXIOS CALL
    // useEffect(() => {
    //   const getEvents = async () => {
    //     try {
    //       const response = await axios.get('http://localhost:3001/event')
    //       console.log(response.data)

    //       setCurrentEvents(response.data.event)
    //     } catch (error) {
    //       console.error('Error fetching data:', error)
    //     }
    //   }
    //   getEvents()
    // }, [])
    console.log(modalShow)



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
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Event Details
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
{/* EVENT TITLE POPULATES HERE */}
               <h4>{Event.title} Ex.  Event Title</h4> 
{/* EVENT START DATE */}
<div className='event-start-date'>
                    <label className='event-details-label'>Event Start Date:</label>
                    <p className='event-text-display'>{Event.startDate}Ex. 11/8/2023</p>
              </div>
{/* EVENT END DATE */}
<div className='event-end-date'>
                    <label className='event-details-label'>Event End Date:</label>
                    <p className='event-text-display'>{Event.endDate} Ex. 11/8/2023</p>
              </div>
{/* EVENT PRIVACY LEVEL */}
<div className='event-privacy-level'>
                    <label className='event-details-label'>Event Privacy Level:</label>
                    <p className='event-text-display'>{Event.privacyLevel} ex. Public</p>
              </div>
{/* EVENT LOCATION */}
<div className='event-location'>
                    <label className='event-details-label'>Event Location:</label>
                    <p className='event-text-display'>{Event.location} ex. 123 Rainbow Road North Pole</p>
              </div>
{/* EVENT DETAILS */}
                <div className='event-description'>
                    <label className='event-details-label'>Event Description:</label>
                    <p className='event-text-display'>
                        {Event.description}
                        Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                        consectetur ac, vestibulum at eros.
                    </p>
                </div>

            </Modal.Body>
            <Modal.Footer>
     
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