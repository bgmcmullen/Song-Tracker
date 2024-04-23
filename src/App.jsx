import { useState } from 'react'
import './App.css'
import Header from './Header.jsx';
import axios from 'axios';
import SongCard from './SongCard.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';




const SERVER_URL = import.meta.env.VITE_SERVER_URI;




function App() {

const [songData, setSongData] = useState([]);

 
async function getArtists() {
  try {
    const response = await axios.get(`${SERVER_URL}/artist`)


    setSongData(response.data);
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error);
  }
  }

  return (
    <>
      <Header />
      <button onClick={getArtists}>Get Artists</button>
      {songData.length > 0 && (
        <div>
          {songData.map((song, index) => (
            <SongCard key={index} songTitle={song.strTrack} songDescription={
              song.strDescriptionEN} img={song.strTrackThumb}/>
          ))}
        </div>
      )}
    </>
  );
}


export default App
