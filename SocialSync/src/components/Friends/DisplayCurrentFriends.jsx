const FriendsList = () => {
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        // Fetch friends list
        const fetchFriends = async () => {
            try {
                const response = await axios.get('http://localhost:3001/friends');
                setFriends(response.data);
            } catch (error) {
                console.error('Error fetching friends:', error);
            }
        };

        fetchFriends();
    }, []);

    return (
        <div>
            <h3>My Friends</h3>
            <ul>
                {friends.map(friend => (
                    <li key={friend._id}>{friend.email}</li>
                ))}
            </ul>
        </div>
    );
};
