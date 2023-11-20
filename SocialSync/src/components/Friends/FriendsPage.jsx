import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import SearchFriends from './SearchFriends';
import PendingRequests from './PendingRequests';
import FriendsList from './FriendList';
import sendFriendRequest from './SendFriendRequest';

const FriendsPage = () => {
    const { user, getAccessTokenSilently } = useAuth0();
    const [selectedUser, setSelectedUser] = useState(null);

    const handleUserSelect = (selectedUser) => {
        setSelectedUser(selectedUser);
    };

    const handleSendRequest = async () => {
        if (selectedUser) {
            await sendFriendRequest(user.sub, selectedUser._id, getAccessTokenSilently);
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
            <PendingRequests user={user} getAccessTokenSilently={getAccessTokenSilently} />
            <FriendsList />
        </div>
    );
};

export default FriendsPage;