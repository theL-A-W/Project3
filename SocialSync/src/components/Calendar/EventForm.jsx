import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Dropdown from 'react-bootstrap/Dropdown'
import axios from 'axios'


export default function EventForm (){
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const Business = `654d41f36a8016374bb06a42`
  const Sports = `654d41f36a8016374bb06a44`
  const Party = `654d41f36a8016374bb06a46`
  const Other = `654d41f36a8016374bb06a48`
  const [eventData, setEventData] = useState({
    title: '',
    location: '',
    startDate: '',
    endDate: '',
    privacyLevel: '',
    details: '',
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

//AXIOS POST
    // useEffect(() => {
    //   const getEvents = async () => {
    //     try {
    //       const response = await axios.post(`http://localhost:3001/event`)
    //       console.log(response.data)

    //       setCurrentEvents(response.data.event)
    //     } catch (error) {
    //       console.error('Error fetching data:', error)
    //     }
    //   }
    //   getEvents()
    // }, [])

    const handleCreateEvent = async () => {
      try {
        const response = await axios.post('http://localhost:3001/event')
        console.log(response.data)
        // Close the modal and reset form data after successful submission
        handleClose()
        setEventData({
          userId: '',
          eventCategoryId: '',
          title: '',
          description: '',
          startDate: '',
          endDate: '',
          privacyLevel: '',
          location: '',
          image: '',
        })
      } catch (error) {
        console.error('Error creating event:', error)
      }
    }






    return (
      <div className='create-event'>
        <button id="create-event" variant="primary" onClick={handleShow}>Create Event</button>


        <Modal show={show} onHide={handleClose} backdrop='static' >
{/* MODAL HEADER */}
        <Modal.Header closeButton id="modal-body">
          <Modal.Title>Create an Event</Modal.Title>
        </Modal.Header >
        <Modal.Body id="modal-body">
          <Form>
{/* EVENT TITLE */}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Event Title:</Form.Label>
              <Form.Control
                type="text"
                // placeholder="Event Name"
                autoFocus
              />
            </Form.Group>
{/* LOCATION */}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Location:</Form.Label>
              <Form.Control
                type="address"
                // placeholder="Event Name"
                autoFocus
              />
            </Form.Group>
{/* START DATE */}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label>Start Date:</Form.Label>
              <Form.Control
                type="datetime-local"
                // placeholder="Event Name"
                autoFocus
              />
            </Form.Group>
{/* END DATE */}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
              <Form.Label>End Date:</Form.Label>
              <Form.Control
                type="datetime-local"
                // placeholder="Event Name"
                autoFocus
              />
            </Form.Group>
{/* PRIVACY LEVEL */}
          <Form.Group className='dropdowns'>
            <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic" className="privacy-dropdown">Privacy Level
                    </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item >Private</Dropdown.Item>
                    <Dropdown.Item >Public</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

{/* EVENT TYPE */}

            <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic" className="privacy-dropdown" >Event Type
                    </Dropdown.Toggle>
                <Dropdown.Menu >
                    <Dropdown.Item >Business</Dropdown.Item>
                    <Dropdown.Item >Sports</Dropdown.Item>
                    <Dropdown.Item >Party</Dropdown.Item>
                    <Dropdown.Item >Other</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
{/* DETAILS */}
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Event Details:</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer id="modal-body">
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
{/* CREATE EVENT BUTTON */}
          <Button variant="primary" onClick={handleCreateEvent}>
            Create Event
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    );
  };
  