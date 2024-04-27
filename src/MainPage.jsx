import React, { Component } from 'react';
import './App.css'; // Importing the CSS file for styling.
import Header from './Header.jsx'; // Importing the Header component.
import axios from 'axios'; // Importing Axios for making HTTP requests.
import SongCard from './SongCard.jsx'; // Importing the SongCard component.
import Form from 'react-bootstrap/Form'; // Importing Form component from React Bootstrap.
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing Bootstrap CSS.
import Button from 'react-bootstrap/Button'; // Importing Button component from React Bootstrap.
import Container from 'react-bootstrap/Container'; // Importing Container component from React Bootstrap.
import Row from 'react-bootstrap/Row'; // Importing Row component from React Bootstrap.
import Col from 'react-bootstrap/Col'; // Importing Col component from React Bootstrap.
import { withAuth0 } from '@auth0/auth0-react'; // Importing withAuth0 higher-order component from Auth0 React SDK.
import Profile from './Profile.jsx'; // Importing the Profile component.

const SERVER_URL = import.meta.env.VITE_SERVER_URI; // Setting the server URL.

/**
 * Class component representing the main page of the application.
 * Renders search functionality, top 10 songs, and user favorites.
 * Utilizes Axios for making HTTP requests and Auth0 for authentication.
 */
class MainPage extends Component {
  constructor(props) {
    super(props);
    // Initializing state variables.
    this.state = {
      songData: [],
      query: '',
      favoritesData: [],
      config: {},
      token: {},
    };
  }

  componentDidMount() {
    // Call the getFavorites method when component mounts.
    this.getFavorites();
  }
  
  // Method to fetch artists based on search query.
  async getArtists() {
    try {
      const response = await axios.get(`${SERVER_URL}/artist/${this.state.query}`, this.state.config);
      if (!response.data) return;
      // Update state with fetched data.
      this.setState({ songData: response.data });
    } catch (error) {
      console.error('Error:', error);
    }
    // Refresh favorites after fetching artists.
    this.getFavorites();
  }

  // Method to fetch user favorites.
  async getFavorites() {
    try {
      // Retrieve JWT token.
      const res = await this.props.auth0.getIdTokenClaims();
      const token = res.__raw;
      this.setState({ token });

      // Set configuration for Axios request.
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'GET',
        baseURL: SERVER_URL,
        url: '/test',
      };

      // Update state with configuration.
      this.setState({ config });

      // Fetch favorites from server.
      const favorites = await axios.get(`${SERVER_URL}/favorites`, this.state.config);
      // Update state with favorites data.
      this.setState({ favoritesData: favorites.data });
    } catch (error) {
      console.error('Error:', error);
    }
  }

  render() {
    const { songData, favoritesData } = this.state;

    return (
      <>
        <Profile/> {/* Render the Profile component. */}
        <Form>
          {/* Search form for artists. */}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Artist Name</Form.Label>
            <Form.Control placeholder="Search" onChange={(e) => this.setState({ query: e.target.value })} />
          </Form.Group>
          {/* Button to trigger artist search. */}
          <Button variant="primary" onClick={() => this.getArtists()}>
            Search Artist
          </Button>
        </Form>
        <Container>
          <Row>
            <Col>
              <h2>Top 10</h2>
              {/* Render top 10 songs. */}
              {songData.length > 0 && songData.map((song, index) => (
                <SongCard key={index} song={song} SERVER_URL={SERVER_URL} isFavorite={false} getFavorites={() => this.getFavorites()} config={this.state.config}/>
              ))}
            </Col>
            <Col>
              <h2>Favorites</h2>
              {/* Render user favorites. */}
              {favoritesData.length > 0 && favoritesData.map((song, index) => (
                <SongCard key={index} dbObject={song} song={song.songObject.songObject} SERVER_URL={SERVER_URL} isFavorite={true} getFavorites={() => this.getFavorites()} config={this.state.config}/>
              ))}
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default withAuth0(MainPage); // Exporting the MainPage component with authentication support.
