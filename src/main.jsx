import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Auth0Provider, withAuth0 } from '@auth0/auth0-react';

const AUTH_CLIENT_ID = import.meta.env.VITE_CLIENT;
const AUTH_DOMAIN = import.meta.env.VITE_DOMAIN;

const AppWithAuth = withAuth0(App);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain={AUTH_DOMAIN}
      clientId={AUTH_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <AppWithAuth />
    </Auth0Provider>
  </React.StrictMode>
);