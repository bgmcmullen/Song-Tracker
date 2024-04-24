import { useState } from 'react';
import './App.css';
import Header from './Header.jsx';
import axios from 'axios';
import SongCard from './SongCard.jsx'
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';




const SERVER_URL = import.meta.env.VITE_SERVER_URI;




function App() {

  const [songData, setSongData] = useState([]);
  const [query, setQuery] = useState('');
  const [favoritesData, setFavoritesData] = useState([]);


  async function getArtists() {
    console.log('bob');
    
    try {
      
      const response = await axios.get(`${SERVER_URL}/artist/${query}`)
      setSongData(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
    try{
      const favorites = await axios.get(`${SERVER_URL}/favorites`);
      console.log(favorites.data);
      setFavoritesData(favorites.data);

    } catch (error) {
      console.error('Error:', error);
    }
  }


  return (
    <>
      <Header />
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Artist Name</Form.Label>
          <Form.Control placeholder="Search" onChange={(e) => setQuery(e.target.value)} />
        </Form.Group>

        <Button variant="primary" onClick={() => getArtists()}>
          Search Artist
        </Button>
      </Form>
      <h2>Top 10</h2>
      {songData.length > 0 && (
        <div>
          {songData.map((song, index) => (
            <SongCard key={index} song={song} SERVER_URL={SERVER_URL} isFavorite={false} getArtists={getArtists}/>
          ))}
        </div>
      )}
      <h2>Favorites</h2>
      {favoritesData.length > 0 && (
        <div>
          {favoritesData.map((song, index) => (
            <SongCard key={index} dbObject={song} song={song.songObject} SERVER_URL={SERVER_URL} isFavorite={true} getArtists={getArtists}/>
          ))}
        </div>
      )}
    </>
  );
}


export default App
