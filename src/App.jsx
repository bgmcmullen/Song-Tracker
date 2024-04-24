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




const SERVER_URL = import.meta.env.VITE_SERVER_URI;




function App() {

  const { isAuthenticated } = useAuth0();

  const [songData, setSongData] = useState([]);
  const [query, setQuery] = useState('');
  const [favoritesData, setFavoritesData] = useState([]);
  const [config, setConfig] = useState({});

  useEffect(() => {
    getFavorites(); // This will run once when the component mounts
  }, []);

  async function getToken() {
    return await this.props.auth0.getIdTokenClaims()
    .then(res => res.__raw)
    .catch(err => console.error(err))
  }


  async function getArtists() {

    const jwt = await getToken();
    setConfig({ headers: { 'Authorization': `Bearer ${jwt}` } }, async () =>{
      try {
      
        const response = await axios.get(`${SERVER_URL}/artist/${query}`)
        if(!response.data)
          return;
        setSongData(response.data);
      } catch (error) {
        console.error('Error:', error);
      }

    } )
    

  }

  async function getFavorites(){

    try{
      const favorites = await axios.get(`${SERVER_URL}/favorites`);
      setFavoritesData(favorites.data);

    } catch (error) {
      console.error('Error:', error);
    }

  }


  return (
    <>
      <Header />
      {isAuthenticated ? (<><Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Artist Name</Form.Label>
          <Form.Control placeholder="Search" onChange={(e) => setQuery(e.target.value)} />
        </Form.Group>

        <Button variant="primary" onClick={() => getArtists()}>
          Search Artist
        </Button>
      </Form><Container>
          <Row>
            <Col>
              <h2>Top 10</h2>
              {songData.length > 0 && (
                <>
                  {songData.map((song, index) => (
                    <SongCard key={index} song={song} SERVER_URL={SERVER_URL} isFavorite={false} getFavorites={getFavorites} />
                  ))}
                </>
              )}
            </Col>
            <Col>
              <h2>Favorites</h2>

              {favoritesData.length > 0 && (
                <>
                  {favoritesData.map((song, index) => (
                    <SongCard key={index} dbObject={song} song={song.songObject} SERVER_URL={SERVER_URL} isFavorite={true} getFavorites={getFavorites} />
                  ))}
                </>
              )}
            </Col>
          </Row>
        </Container></>) : <h2>Please Login to continue</h2>}
    </>
  );
}


export default withAuth0(App);
