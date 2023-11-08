import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

export default function Authentication() {
    const { isAuthenticated } = useAuth0();
    return (
        <div className="authentication">
            {isAuthenticated ? <LogoutButton /> : <LoginButton />}
        </div>
    );
}