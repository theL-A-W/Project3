import React, { useState } from 'react';
import axios from 'axios';

const SearchFriends = ({ onUserSelect }) => {
    const [email, setEmail] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/users/search?email=${email}`);
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error searching users:', error);
        }
    };

    return (
        <div>
            <input 
                type="text" 
                placeholder="Enter user's email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
            />
            <button onClick={handleSearch}>Search</button>
            <ul>
                {searchResults.map(user => (
                    <li key={user._id} onClick={() => onUserSelect(user)}>
                        {user.email} - {user.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchFriends;
