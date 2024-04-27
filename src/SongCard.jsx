import { useState } from 'react'; // Importing useState hook from React.
import Button from 'react-bootstrap/Button'; // Importing Button component from React Bootstrap.
import Card from 'react-bootstrap/Card'; // Importing Card component from React Bootstrap.
import Accordion from 'react-bootstrap/Accordion'; // Importing Accordion component from React Bootstrap.
import VideoModal from './VideoModal'; // Importing VideoModal component.
import axios from 'axios'; // Importing Axios for making HTTP requests.

/**
 * Functional component representing a card displaying song information.
 * Allows users to add/remove songs from favorites and view a video modal.
 * @param {Object} props - Props passed to the component.
 * @returns {JSX.Element} - Rendered component.
 */
export default function SongCard(props) {

  const [show, setShow] = useState(false); // State variable to manage modal visibility.
  const handleClose = () => setShow(false); // Function to close the modal.
  const handleShow = () => setShow(true); // Function to show the modal.

  /**
   * Function to add the song to favorites.
   */
  async function addToFavorites() {
    try {
      // Make a POST request to add the song to favorites.
      await axios.post(`${props.SERVER_URL}/artist`, {'songObject': props.song}, props.config);
      // Refresh favorites after adding.
      await props.getFavorites();
    } catch (error) {
      console.error('Error:', error);
      // Handle error here (e.g., show error message to the user)
    }
  }

  /**
   * Function to remove the song from favorites.
   */
  async function removeFromFavorites() {
    try {
      // Make a DELETE request to remove the song from favorites.
      await axios.delete(`${props.SERVER_URL}/favorites/${props.dbObject._id}`, props.config);
      // Refresh favorites after removal.
      await props.getFavorites();
    } catch (error) {
      console.error('Error:', error);
      // Handle error here (e.g., show error message to the user)
    }
  }

  return (
    <>
      {/* Card displaying song information */}
      <Card style={{ width: '100%' }}>
        <Card.Img variant="top" src={props.song['strTrackThumb']} />
        <Card.Body style={{ padding: '0px' }}>
          <Card.Title>{props.song.strTrack || props.song.songObject.strTrack}</Card.Title>
          <Card.Text>
            {/* Additional information about the song */}
          </Card.Text>
          {/* Accordion to show description */}
          {props.song.strDescriptionEN && <Accordion>
              <Accordion.Item eventKey="0" style={{ margin: '0px' }}>
                <Accordion.Header>Description</Accordion.Header>
                <Accordion.Body>
                  {props.song.strDescriptionEN}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>}
          {/* Button to view video */}
          {props.song.strMusicVid && <Button variant="primary" onClick={handleShow}>View Video</Button>}
          {/* Button to add to favorites */}
          {!props.isFavorite && <Button variant="secondary" onClick={addToFavorites}>Add to Favorites</Button>}
          {/* Button to remove from favorites */}
          {props.isFavorite && <Button variant="secondary" onClick={removeFromFavorites}>Remove from Favorites</Button>}
        </Card.Body>
      </Card>
      {/* Modal to display video */}
      {props.song.strMusicVid && <VideoModal songTitle={props.song.strTrack} handleClose={handleClose} handleShow={handleShow} show={show} videoUrl={props.song.strMusicVid} />}
    </>
  )

}
