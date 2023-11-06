import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../AuthContext';
//ProtectedRoute is a route guard that checks if the user is authenticated. If they are, it proceeds to render the requested component. If not, it redirects the user to the login page. 
const ProtectedRoute = ({ component: Component, ...rest }) => {
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

export default ProtectedRoute;
