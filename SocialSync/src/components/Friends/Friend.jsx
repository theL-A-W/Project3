
import { useState, useEffect } from 'react';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons'
import { useAuth0 } from "@auth0/auth0-react";


// library.add( faDeleteLeft )

export default function Friends (){
        const [show, setShow] = useState(false);
        const [friends, setFriends] = useState([]);

        const {
    isAuthenticated,
    user,
    getAccessTokenSilently
} = useAuth0();

        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

        useEffect(() => {
            if (isAuthenticated && user) {
                const fetchFriends = async () => {
                    try {
                        const accessToken = await getAccessTokenSilently();
                        // Fetch the user document from the backend
                        const userResponse = await axios.get(`http://localhost:3001/user/${user.sub}`, {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                            },
                        });
                        // Assuming the backend populates the friendsUserID field with friend User documents
                        const friendsList = userResponse.data.friendsUserID;
                        setFriends(friendsList);
                    } catch (error) {
                        console.error('Error fetching friends:', error);
                    }
                };
        
                fetchFriends();
            }
        }, [user, isAuthenticated, getAccessTokenSilently]);

    // Handle delete friend
    const handleDeleteFriend = (friendId) => {
        // Here you would call your API to delete the friend by friendId
        console.log('Deleting friend with id:', friendId);
        // Update the friends state to remove the friend
        setFriends(prevFriends => prevFriends.filter(friend => friend.id !== friendId));
    };

    return (
        <div>
            <Button id="friendsListButton" variant="primary" onClick={handleShow}>Friends</Button>

            {/* FRIEND LIST */}
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title id="friends-list-title">Friend List:</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Header className="search-friends">
                    {/* FRIEND SEARCH */}
                    <input placeholder="search friends" id="search-friends"></input>
                    <button>Search</button>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ul className="list-of-friends">
                        {friends.map(friend => (
                            <li key={friend.id} className="friend-item">
                                {friend.name}
                                <button id="delete-friend" onClick={() => handleDeleteFriend(friend.id)}>
                                    <FontAwesomeIcon icon={faDeleteLeft} size="lg" style={{ color: "#bb111a" }} />
                                </button>
                            </li>
                        ))}
                    </ul>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}