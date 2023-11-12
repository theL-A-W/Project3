import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import SearchFriends from './SearchFriends';
import PendingRequests from './PendingRequests';
import FriendsList from './FriendsList';

const FriendsPage = () => {
    const { user, getAccessTokenSilently } = useAuth0();
    const [selectedUser, setSelectedUser] = useState(null);

    const handleUserSelect = (selectedUser) => {
        setSelectedUser(selectedUser);
    };

    const handleSendRequest = async () => {
        if (selectedUser) {
            sendFriendRequest(user.sub, selectedUser._id);
        }
    };

    const handleAcceptRequest = async (requestId) => {
        try {
            const accessToken = await getAccessTokenSilently();
            await axios.put(`http://localhost:3001/friendships/accept/${requestId}`, {}, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            // Re-fetch data to update the UI or handle state updates
        } catch (error) {
            console.error('Error accepting friend request:', error);
        }
    };

    const handleRejectRequest = async (requestId) => {
        try {
            const accessToken = await getAccessTokenSilently();
            await axios.delete(`http://localhost:3001/friendships/reject/${requestId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            // Re-fetch data to update the UI or handle state updates
        } catch (error) {
            console.error('Error rejecting friend request:', error);
        }
    };

    return (
        <div>
            <SearchFriends onUserSelect={handleUserSelect} />
            {selectedUser && (
                <div>
                    <p>Selected User: {selectedUser.email}</p>
                    <button onClick={handleSendRequest}>Send Friend Request</button>
                </div>
            )}
            <PendingRequests onAccept={handleAcceptRequest} onReject={handleRejectRequest} />
            <FriendsList />
        </div>
    );
};

export default FriendsPage;
