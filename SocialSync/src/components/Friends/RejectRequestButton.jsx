import React from 'react';
import axios from 'axios';

const RejectRequestButton = ({ requestId, getAccessTokenSilently, onReject }) => {
    const handleReject = async () => {
        try {
            const accessToken = await getAccessTokenSilently();
            await axios.delete(`http://localhost:3001/friendships/reject/${requestId}`, {
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
