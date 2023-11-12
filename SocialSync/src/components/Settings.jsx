
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react'; // Import the hook
import './Styles/Profile.css';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormText from 'react-bootstrap/esm/FormText';
import FormGroup from 'react-bootstrap/esm/FormGroup';


export default function Settings (){
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0(); // Destructure the Auth0 hook
  const [darkMode, setDarkMode] = useState(false)


  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  }

  useEffect(() => {

  if (darkMode) {
    document.body.classList.add('dark-mode');
    // document.body.style.backgroundColor = '#1F1B24'
    // document.body.style.color = 'white'
  } else {
    document.body.classList.remove('dark-mode');
    // document.body.style.backgroundColor = 'white'
  }
}, [darkMode])



  return (
    <Form className="profile-Form">
      <FormText id="profile-title">Settings</FormText>
      <FormGroup id="settings-form-box">
      <Form.Check
        type="switch"
        id="custom-switch"
        label="Enable Dark Mode"
        onChange={toggleDarkMode}
        checked={darkMode}
      />
      {/* <Form.Select aria-label="Default select example" onChange={eventColorChange} value={eventColor}>
      <option>Event Color</option>
      <option value="1" >Blue</option>
      <option value="2">Orange</option>
      <option value="3">Green</option>
      <option value="4">Red</option>
      <option value="5">Pink</option>
    </Form.Select> */}
    
      </FormGroup>
  </Form>
  )
}

