import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Dropdown from 'react-bootstrap/Dropdown'


export default function EventForm (){
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    

    return (
      <div className='create-event'>
        <button id="create-event" variant="primary" onClick={handleShow}>Create Event</button>


        <Modal show={show} onHide={handleClose}>
{/* MODAL HEADER */}
        <Modal.Header closeButton>
          <Modal.Title>Create an Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
          <Form.Group>
            <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic" className="privacy-dropdown">Privacy Level
                    </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item >Private</Dropdown.Item>
                    <Dropdown.Item >Public</Dropdown.Item>
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
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
{/* CREATE EVENT BUTTON */}
          <Button variant="primary" onClick={handleClose}>
            Create Event
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    );
  };
  