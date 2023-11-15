import React from 'react';
import axios from 'axios';

const RejectRequestButton = ({ user, requestId, getAccessTokenSilently, onReject }) => {
    const handleReject = async () => {
        try {
            console.log("Sub:", user.sub)
            const accessToken = await getAccessTokenSilently();
            await axios.put(`http://localhost:3001/friendships/reject/${requestId}`, {
                userAuth0Id: user.sub // Send the user's Auth0 ID 
        },{
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            onReject(requestId);
        } catch (error) {
            console.error('Error rejecting friend request:', error);
        }
    };

    return (
        <button onClick={handleReject}>Reject</button>
    );
};

export default RejectRequestButton;
