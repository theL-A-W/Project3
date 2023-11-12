import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react'; // Import the hook
import './Styles/Profile.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormText from 'react-bootstrap/esm/FormText';

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

  const clearForm = () => {
    setFormState(initialState);
  };

  return (
    <Form className="profile-Form" onSubmit={handleSubmit}>
      <FormText id="profile-title">Profile Edit</FormText>
      <Form.Group className="mb-3" controlId="firstName">
        <Form.Label>First Name:</Form.Label>
        <Form.Control type="text" placeholder="First Name" value={formState.firstName} onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="lastName">
        <Form.Label>Last Name:</Form.Label>
        <Form.Control type="text" placeholder="Last Name" value={formState.lastName} onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="dateOfBirth">
        <Form.Label>Date of Birth:</Form.Label>
        <Form.Control type="text" placeholder="Date of Birth" value={formState.dateOfBirth} onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="profileImage">
        <Form.Label>Image Upload:</Form.Label>
        <Form.Control type="text" placeholder="Image Upload URL/File" value={formState.profileImage} onChange={handleChange} />
      </Form.Group>
      <p>Update Profile Information above.</p>
      <Form.Group className="profile-buttons">
        <Button className="profile-button" id="profile-button" type="submit">Update</Button>
        <Button className="profile-button" id="profile-button" type="button" onClick={cancel}>Cancel</Button>
        <Button className="profile-button" id="profile-button" type="button" onClick={clearForm}>Clear All</Button>
      </Form.Group>
    </Form>
  )
}

export default Profile;
