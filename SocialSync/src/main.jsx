import React from 'react'
import ReactDOM from 'react-dom/client'
//This component sets up the context for Auth0 within your app, which will provide authentication state and functions to your components.
import { Auth0Provider } from '@auth0/auth0-react'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Auth0Provider 
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
redirect_uri: import.meta.env.VITE_AUTH0_CALLBACK_URL,
      }}
    >   
    <App />
    </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>
)
