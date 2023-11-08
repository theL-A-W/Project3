import { useState, useEffect } from 'react';
import axios from 'axios';
import './Styles/Profile.css';

const Profile = () => {
  const initialState = {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    profileImage: '',
  };

  const [formState, setFormState] = useState(initialState);

  useEffect(() => {
    // Assuming you have the user ID from your application's state
    const userId = '654a6473dc31b99f5f4adf8d'; // Replace with the actual user ID
    axios.get(`http://localhost:3001/profile/${userId}`) // Replace with your API endpoint
      .then((response) => {
        const userData = response.data; // Assuming the response contains user data
        setFormState(userData);
      })
      .catch((error) => {
        console.error('Error fetching profile data:', error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Assuming you have the user ID from your application's state
    const userId = '654a6473dc31b99f5f4adf8d'; // Replace with the actual user ID
    axios.put(`http://localhost:3001/profile/${userId}`, formState)
      .then((response) => {
        console.log(response.data);
        alert('Profile updated successfully');
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
        alert('Failed to update profile');
      });
  };

  const handleChange = (event) => {
    setFormState({ ...formState, [event.target.id]: event.target.value });
  };

  const cancel = (event) => {
    event.preventDefault();
    setFormState(initialState);
  };

  return (
    <div className="profile-Form">
      <h1 className="profile-h1">Profile Edit</h1>
      <form className="profile-Formpt2" onSubmit={handleSubmit}>
        <input
          className="profile-input"
          type="text"
          placeholder="First Name"
          id="firstName"
          onChange={handleChange}
          value={formState.firstName}
        />
        <label className="profile-label" htmlFor="firstName">
          First Name
        </label>

        <input
          className="profile-input"
          type="text"
          placeholder="Last name"
          id="lastName"
          onChange={handleChange}
          value={formState.lastName}
        />
        <label className="profile-label" htmlFor="lastName">
          Last Name
        </label>

        <input
          className="profile-input"
          type="text"
          placeholder="Date Of Birth"
          id="dateOfBirth"
          onChange={handleChange}
          value={formState.dateOfBirth}
        />
        <label className="profile-label" htmlFor="dateOfBirth">
          Date of Birth
        </label>

        <input
          className="profile-input"
          type="text"
          placeholder="Image Upload URL/file"
          id="profileImage"
          onChange={handleChange}
          value={formState.profileImage}
        />
        <label className="profile-label" htmlFor="profileImage">
          Image URL/File
        </label>

        <button className="profile-button" type="submit">
          Update
        </button>
        <button className="profile-button" type="cancel" onClick={cancel}>
          Cancel
        </button>
        <p>Update Profile Information above.</p>
      </form>
    </div>
  );
};

export default Profile;
