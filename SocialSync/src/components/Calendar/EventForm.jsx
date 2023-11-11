import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Dropdown from 'react-bootstrap/Dropdown'
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react'


export default function EventForm (){
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const Business = `654d41f36a8016374bb06a42`
  const Sports = `654d41f36a8016374bb06a44`
  const Party = `654d41f36a8016374bb06a46`
  const Other = `654d41f36a8016374bb06a48`

  const [eventData, setEventData] = useState({
    userId: '',
    title: '',
    location: '',
    startDate: '',
    endDate: '',
    privacyLevel: '',
    eventCategoryId: '',
    details: '',
  });

  useEffect(() => {
    // Fetch the user's ObjectId using their Auth0 ID
    const fetchUserId = async () => {
      if (isAuthenticated && user) {
        try {
          const accessToken = await getAccessTokenSilently();
          const response = await axios.get(`http://localhost:3001/user/${user.sub}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          setEventData(prevData => ({ ...prevData, userId: response.data._id }));
        } catch (error) {
          console.error('Error fetching user ID:', error);
        }
      }
    };

    fetchUserId();
  }, [user, isAuthenticated, getAccessTokenSilently]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [id]: value,
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

    const handleDropdownChange = (type, value) => {
      setEventData(prevData => ({
        ...prevData,
        [type]: value,
      }));
    };
  

    const handleCreateEvent = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        const response = await axios.post('http://localhost:3001/event', eventData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log(response.data)
        // Close the modal and reset form data after successful submission
        handleClose()
        setEventData({
          userId: '',
          title: '',
          location: '',
          startDate: '',
          endDate: '',
          privacyLevel: '',
          eventCategoryId: '',
          details: '',
        })
      } catch (error) {
        console.error('Error creating event:', error)
      }
    }



    return (
      <div className='create-event'>

        <button id="create-event" variant="primary" onClick={handleShow}>Create Event</button>



        <Modal show={show} onHide={handleClose} backdrop='static'>
    {/* MODAL HEADER */}
          <Modal.Header closeButton id="modal-body">
            <Modal.Title>Create an Event</Modal.Title>
          </Modal.Header>
          <Modal.Body id="modal-body">

            <Form>
    {/* EVENT TITLE */}
              <Form.Group className="mb-3" controlId="title">
                <Form.Label>Event Title:</Form.Label>
                <Form.Control type="text" onChange={handleInputChange} value={eventData.title} />
              </Form.Group>
  {/* LOCATION */}
              <Form.Group className="mb-3" controlId="location">
                <Form.Label>Location:</Form.Label>
                <Form.Control type="text" onChange={handleInputChange} value={eventData.location} />
              </Form.Group>
  {/* START DATE */}
              <Form.Group className="mb-3" controlId="startDate">
                <Form.Label>Start Date:</Form.Label>
                <Form.Control type="datetime-local" onChange={handleInputChange} value={eventData.startDate} />
              </Form.Group>
  {/* END DATE */}
              <Form.Group className="mb-3" controlId="endDate">
                <Form.Label>End Date:</Form.Label>
                <Form.Control type="datetime-local" onChange={handleInputChange} value={eventData.endDate} />
              </Form.Group>
  {/* PRIVACY LEVEL */}
              <Dropdown onSelect={(e) => handleDropdownChange('privacyLevel', e)}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">Privacy Level</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="Private">Private</Dropdown.Item>
                  <Dropdown.Item eventKey="Public">Public</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
  {/* EVENT TYPE */}
              <Dropdown onSelect={(e) => handleDropdownChange('eventCategoryId', e)}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">Event Type</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey={Business}>Business</Dropdown.Item>
                  <Dropdown.Item eventKey={Sports}>Sports</Dropdown.Item>
                  <Dropdown.Item eventKey={Party}>Party</Dropdown.Item>
                  <Dropdown.Item eventKey={Other}>Other</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
{/* DETAILS */}
            <Form.Group
              className="mb-3"
              controlId="details"
            >
              <Form.Label>Event Details:</Form.Label>
              <Form.Control as="textarea" rows={3} onChange={handleInputChange} value={eventData.details}/>
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
  