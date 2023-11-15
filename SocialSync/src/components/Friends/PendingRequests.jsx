import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import AcceptRequestButton from './AcceptRequestButton';
import RejectRequestButton from './RejectRequestButton';

const PendingRequests = ({ user, getAccessTokenSilently }) => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchPendingRequests = async () => {
            try {
                const accessToken = await getAccessTokenSilently();
                const response = await axios.get(`http://localhost:3001/friendships/pending/${user.sub}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                console.log('Whats this', response.data);
                setRequests(response.data);
            } catch (error) {
                console.error('Error fetching pending requests:', error);
            }
        };
    
        if (user) {
            fetchPendingRequests();
        }
    }, [user, getAccessTokenSilently]);

    // Handler for accepting a request
    const onAcceptHandler = (requestId) => {
        setRequests(prevRequests => prevRequests.filter(req => req._id !== requestId));
    };

    // Handler for rejecting a request
    const onRejectHandler = (requestId) => {
        setRequests(prevRequests => prevRequests.filter(req => req._id !== requestId));
    };
    

    return (
        <div>
            <h3>Pending Friend Requests</h3>
            <ul>
                {requests.map(request => (
                    <li key={request._id}>
                        {request.user1.email}
                        <AcceptRequestButton 
                            requestId={request._id} 
                            getAccessTokenSilently={getAccessTokenSilently} 
                            onAccept={onAcceptHandler} 
                        />
                        <RejectRequestButton
                            user ={user}
                            requestId={request._id} 
                            getAccessTokenSilently={getAccessTokenSilently} 
                            onReject={onRejectHandler} 
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PendingRequests