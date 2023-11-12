const sendFriendRequest = async (fromUserId, toUserId) => {
    try {
        const accessToken = await getAccessTokenSilently();
        const response = await axios.post(`http://localhost:3001/friendships/request`, {
            fromUserId: fromUserId, // The ID of the current user (from Auth0)
            toUserId: toUserId,     // The ID of the user to whom the request is being sent
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        console.log('Friend request sent:', response.data);
        // Optionally update the UI or state here
    } catch (error) {
        console.error('Error sending friend request:', error);
    }
};

export default sendFriendRequest