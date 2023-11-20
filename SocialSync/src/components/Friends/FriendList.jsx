import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { useAuth0 } from '@auth0/auth0-react';

const FriendsList = () => {
    const { user, getAccessTokenSilently } = useAuth0();
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const accessToken = await getAccessTokenSilently();
                const response = await axios.get(`http://localhost:3001/friendships/friends/${user.sub}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setFriends(response.data);
            } catch (error) {
                console.error('Error fetching friends:', error);
            }
        };

        if (user) {
            fetchFriends();
        }
    }, [user, getAccessTokenSilently]);

    const removeFriend = async (user2Id) => {
        console.log('user2firstID:', user2Id)
        try {
            const accessToken = await getAccessTokenSilently();
            await axios.put('http://localhost:3001/friendships', {
                data: { auth0Id: user.sub, user2Id: user2Id }, 
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            // Update the state to remove the friend from the list
            setFriends(friends.filter(friend => friend._id !== friendId));
        } catch (error) {
            console.error('Error removing friend:', error);
        }
    };

    return (
        <div>
            <h3>My Friends</h3>
            <ul>
                {friends.map(friend => (
                    <li key={friend._id}>
                        {friend.email}
                        <button onClick={() => removeFriend(friend._id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FriendsList;
