import React, { createContext, useContext, useEffect, useState } from 'react';
//This hook allows you to access the authentication state and methods from anywhere in your component tree, as long as the components are children of Auth0Provider
import { useAuth0 } from '@auth0/auth0-react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    //You can use these in your components to check if a user is authenticated (isAuthenticated), to start the login process (loginWithRedirect), to log out (logout), and to access user profile information (user).
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();
  console.log("Line 10: ", user, isAuthenticated, isLoading)
  const [authState, setAuthState] = useState({
    user: null,
    isAuthenticated: false,
    isLoading: true
    
  });

  useEffect(() => {
    setAuthState({ user, isAuthenticated, isLoading });
  }, [user, isAuthenticated, isLoading]);
  console.log("Line 10: ", user, isAuthenticated, isLoading)
  return (
    <AuthContext.Provider value={{ authState, loginWithRedirect, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
