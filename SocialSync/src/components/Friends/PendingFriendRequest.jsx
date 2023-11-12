const PendingRequests = ({ onAccept, onReject }) => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        // Fetch pending requests
        const fetchPendingRequests = async () => {
            try {
                const response = await axios.get('http://localhost:3001/friendships/pending');
                setRequests(response.data);
            } catch (error) {
                console.error('Error fetching pending requests:', error);
            }
        };

        fetchPendingRequests();
    }, []);

    return (
        <div>
            <h3>Pending Friend Requests</h3>
            <ul>
                {requests.map(request => (
                    <li key={request._id}>
                        {request.fromUser.email}
                        <button onClick={() => onAccept(request._id)}>Accept</button>
                        <button onClick={() => onReject(request._id)}>Reject</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
