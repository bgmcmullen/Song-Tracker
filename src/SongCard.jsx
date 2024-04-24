import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import VideoModal from './VideoModal';
import axios from 'axios';

export default function SongCard(props) {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  async function addToFavorites() {
    try{
      console.log('add');
      const response = await axios.post(`${props.SERVER_URL}/artist`, {'songObject': props.song})
      props.getArtists();
    } catch (error) {
      console.error('Error:', error);
      // Handle error here (e.g., show error message to the user)
    }
    
  }

  async function removefromFavorites() {
    try{
      console.log('remove');
      const response = await axios.delete(`${props.SERVER_URL}/favorites/${props.dbObject._id}`)
      props.getArtists();
  
    } catch (error) {
      console.error('Error:', error);
      // Handle error here (e.g., show error message to the user)
    }
    
  }


  
  return (
    <>
      <Card style={{ width: '50%' }}>
        <Card.Img variant="top" src={props.song.strTrackThumb} />
        <Card.Body style={{ padding: '0px' }}>
          <Card.Title>{props.song.strTrack}</Card.Title>
          <Card.Text>
          {props.song.strDescriptionEN && <Accordion>
              <Accordion.Item eventKey="0" style={{ margin: '0px' }}>
                <Accordion.Header>Description</Accordion.Header>
                <Accordion.Body>
                  {props.song.strDescriptionEN}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>}
          </Card.Text>
          {props.song.strMusicVid && <Button variant="primary" onClick={handleShow}>View Video</Button>}
          {!props.isFavorite && <Button variant="secondary" onClick={addToFavorites}>Add to Favorites</Button>}
          {props.isFavorite && <Button variant="secondary" onClick={removefromFavorites}>Remove from Favorites</Button>}
        </Card.Body>
      </Card>
      {props.song.strMusicVid && <VideoModal songTitle={props.song.strTrack} handleClose={handleClose} handleShow={handleShow} show={show} videoUrl={props.song.strMusicVid} />}
    </>
  )

}