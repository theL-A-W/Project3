import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const UserProfile = ({ component: Component, ...rest }) => {
  const { authState } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => authState.isAuthenticated 
        ? <Component {...props} />
        : <Redirect to="/login" />
      }
    />
  );
};

export default UserProfile;
