import axios from "axios";

const removeFriend = async ({auth0Id, requestId}) => {
    try {
        const accessToken = await getAccessTokenSilently(); // Make sure you have access to this function
        await axios.put('http://localhost:3001/friendships', {
            data: { auth0Id, requestId }, // Axios delete sends data in the 'data' field
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        console.log("Friendship deleted successfully");
      
    } catch (error) {
        console.error('Error removing friend:', error);
    }
};

export default removeFriend