import axios from 'axios';

const sendFriendRequest = async (userAuth0Id, receiverUserId, getAccessTokenSilently) => {
    try {
        const accessToken = await getAccessTokenSilently();
        const response = await axios.post('http://localhost:3001/friendships/request', {
            user1Auth0Id: userAuth0Id, // The Auth0 ID of the user sending the request
            user2Id: receiverUserId,   // The MongoDB ID of the user receiving the request
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        console.log('Friend request sent:', response.data);
    } catch (error) {
        console.error('Error sending friend request:', error);
    }
};

export default sendFriendRequest;
