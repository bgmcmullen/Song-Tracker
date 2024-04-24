import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';

const AUTH_CLIENT_ID = import.meta.env.VITE_CLIENT;
const AUTH_DOMAIN = import.meta.env.VITE_DOMAIN;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <Auth0Provider
    domain = {AUTH_DOMAIN}
    clientId = {AUTH_CLIENT_ID}
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
    </Auth0Provider>,
  </React.StrictMode>,
)
