import { useState, useEffect } from 'react';
import './App.css';
import Header from './Header.jsx';
import axios from 'axios';
import SongCard from './SongCard.jsx'
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useAuth0 } from '@auth0/auth0-react';
import {withAuth0} from '@auth0/auth0-react';
import MainPage from './MainPage.jsx';




const SERVER_URL = import.meta.env.VITE_SERVER_URI;




function App() {

  const { isAuthenticated } = useAuth0();


  return (
    <>

      <Header />
      
      {isAuthenticated ? (<MainPage/>) : <h2>Please Login to continue</h2>}
      </>
  );
}


export default App;
