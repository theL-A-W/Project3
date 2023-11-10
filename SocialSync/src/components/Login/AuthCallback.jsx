import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const AuthCallback = () => {
  const { handleRedirectCallback } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    const processAuthCallback = async () => {
      await handleRedirectCallback();
      navigate('/usercalendar'); // Redirect to callback page after login
    };
    processAuthCallback();
  }, [handleRedirectCallback, navigate]);

  return <div>Loading authentication result...</div>;
};

export default AuthCallback;
