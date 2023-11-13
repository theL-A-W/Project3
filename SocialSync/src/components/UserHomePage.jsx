import UserCalendar from "./UserCalendar"
import EventForm from "./Calendar/EventForm"
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons'



export default function UserHomePage (){
        const [show, setShow] = useState(false);
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);



    return (
        <div>
            <h1 id="user-home-title">Welcome User</h1>
            <Button id="friendsListButton" variant="primary" onClick={handleShow}>Friends</Button>
                <EventForm/>
            <div className="upcoming-events">
                <h2>Upcomming Events</h2>
                <ul>
                    <li>This is an upcoming event</li>
                    <li>These upcomming events can be imported as a list plug-in in FullCalendar</li>
                </ul>
            </div>
            <div>

{/* FRIEND LIST */}

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title id="friends-list-title">Friend List:</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Header className="search-friends">
{/* FRIEND SEARCH */}
        <input placeholder="search friends"  id="search-friends"></input>
        <button>Search</button>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <ul className="list-of-friends">
                <li id="list-of-friends">John Smith
                    <button id="delete-friend" >
                        <FontAwesomeIcon icon={faDeleteLeft} size="lg" style={{color: "#bb111a",}} />
                    </button></li>
                <li  id="list-of-friends">Paul Anderson
                    <button id="delete-friend">
                        <FontAwesomeIcon icon={faDeleteLeft} size="lg" style={{color: "#bb111a",}} />
                    </button></li>
                <li  id="list-of-friends">Sam Jones
                    <button id="delete-friend">
                        <FontAwesomeIcon icon={faDeleteLeft} size="lg" style={{color: "#bb111a",}} />
                    </button></li>
                <li  id="list-of-friends">Jeremy Smith
                    <button id="delete-friend">
                        <FontAwesomeIcon icon={faDeleteLeft} size="lg" style={{color: "#bb111a",}} />
                    </button></li>
                <li  id="list-of-friends">John Smith
                    <button id="delete-friend">
                        <FontAwesomeIcon icon={faDeleteLeft} size="lg" style={{color: "#bb111a",}} />
                    </button></li>
            </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
            
            <UserCalendar/>
        </div>

)
}

