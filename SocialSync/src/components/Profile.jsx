import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react'; // Import the hook
import './Styles/Profile.css';

const Profile = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0(); // Destructure the Auth0 hook
  const initialState = {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    profileImage: '',
  };

  const [formState, setFormState] = useState(initialState);

  useEffect(() => {
    if (isAuthenticated && user) {
      const getUserData = async () => {
        try {
          const accessToken = await getAccessTokenSilently();
          const response = await axios.get(`http://localhost:3001/Profile/${user.sub}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          setFormState(response.data);
        } catch (error) {
          console.error('Error fetching profile data:', error);
        }
      };
      getUserData();
    }
  }, [user, isAuthenticated, getAccessTokenSilently]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isAuthenticated && user) {
      try {
        const accessToken = await getAccessTokenSilently();
        await axios.put(`http://localhost:3001/profile/${user.sub}`, formState, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        alert('Profile updated successfully');
      } catch (error) {
        console.error('Error updating profile:', error);
        alert('Failed to update profile');
      }
    }
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
