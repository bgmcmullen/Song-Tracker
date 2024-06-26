import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from 'react-bootstrap/Button';


function LogoutButton() {

  const {
    isAuthenticated,
    logout
  } = useAuth0();

  function handleLogout() {
    logout({ returnTo: '/'});
  }

  return isAuthenticated &&
    <Button variant='danger' onClick={handleLogout}>Log out</Button>
    ;
}

export default LogoutButton;