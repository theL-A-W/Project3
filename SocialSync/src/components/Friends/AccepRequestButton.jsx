const acceptFriendRequest = async (userId, friendId) => {
    try {
        await axios.put(`http://localhost:3001/friendships/accept`, {
            userId,
            friendId
        });
        alert('Friend request accepted!');
    } catch (error) {
        console.error('Error accepting friend request:', error);
    }
};

export default acceptFriendRequest