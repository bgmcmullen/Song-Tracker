import React from 'react';
import './App.css'; // Importing the CSS file for styling.
import Header from './Header.jsx'; // Importing the Header component.
import { useAuth0 } from '@auth0/auth0-react'; // Importing the useAuth0 hook from Auth0 React SDK.
import MainPage from './MainPage.jsx'; // Importing the MainPage component.

/**
 * Functional component representing the main application.
 * Renders the Header component and conditionally renders either the MainPage component if user is authenticated,
 * or a message prompting the user to login if not authenticated.
 */
function App() {
  const { isAuthenticated } = useAuth0(); // Destructuring isAuthenticated from useAuth0 hook.

  return (
    <>
      <Header /> {/* Rendering the Header component. */}
      
      {/* Conditionally rendering either the MainPage component or a login prompt based on user authentication status. */}
      {isAuthenticated ? (<MainPage/>) : <h2>Please Login to continue</h2>}
    </>
  );
}

export default App; // Exporting the App component as default.
