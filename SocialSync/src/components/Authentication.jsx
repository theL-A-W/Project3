import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

export default function Authentication() {
    const { isAuthenticated } = useAuth0();

    return (
        <div className="authentication">
            <h3 id="sign-up">Sign-up</h3>
            <h1 id="authentication-title">This is the authentication title</h1>
            {isAuthenticated ? <LogoutButton /> : <LoginButton />}
        </div>
    );
}
