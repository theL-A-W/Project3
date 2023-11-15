import React from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const AcceptRequestButton = ({ requestId, onAccept }) => {
    const { user, getAccessTokenSilently } = useAuth0(); // Get Auth0 user and token getter

    const handleAccept = async () => {
        try {
            const accessToken = await getAccessTokenSilently();
            await axios.put(`http://localhost:3001/friendships/accept/${requestId}`, {
                userAuth0Id: user.sub // Send the user's Auth0 ID
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            onAccept(requestId);
        } catch (error) {
            console.error('Error accepting friend request:', error);
        }
    };

    return (
        <button onClick={handleAccept}>Accept</button>
    );
};

export default AcceptRequestButton;
