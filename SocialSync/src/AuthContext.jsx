import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();
  const [authState, setAuthState] = useState({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  useEffect(() => {
    setAuthState({ user, isAuthenticated, isLoading });
  }, [user, isAuthenticated, isLoading]);

  return (
    <AuthContext.Provider value={{ authState, loginWithRedirect, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
