import React, { Component } from 'react';
import './App.css';
import Header from './Header.jsx';
import axios from 'axios';
import SongCard from './SongCard.jsx';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { withAuth0 } from '@auth0/auth0-react';
import Profile from './Profile.jsx';

const SERVER_URL = import.meta.env.VITE_SERVER_URI;

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songData: [],
      query: '',
      favoritesData: [],
      config: {},
      token: {},
    };
  }

  componentDidMount() {
    this.getFavorites();
  }
  

  async getArtists() {
    try {


      const response = await axios.get(`${SERVER_URL}/artist/${this.state.query}`, this.state.config);
      if (!response.data) return;

      this.setState({ songData: response.data });
    } catch (error) {
      console.error('Error:', error);
    }
    this.getFavorites();
  }

  async getFavorites() {
    try {
      const res = await this.props.auth0.getIdTokenClaims();
      const token = res.__raw;
      this.setState({ token });

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'GET',
        baseURL: 'http://localhost:3005',
        url: '/test',
      };

      this.setState({ config });

      const songResponse = await axios(config);
      // console.log(songResponse);
      const favorites = await axios.get(`${SERVER_URL}/favorites`, this.state.config);
      this.setState({ favoritesData: favorites.data });
    } catch (error) {
      console.error('Error:', error);
    }
  }

  render() {
    const { songData, query, favoritesData } = this.state;

    return (
      <>
      <Profile/>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Artist Name</Form.Label>
            <Form.Control placeholder="Search" onChange={(e) => this.setState({ query: e.target.value })} />
          </Form.Group>
          <Button variant="primary" onClick={() => this.getArtists()}>
            Search Artist
          </Button>
        </Form>
        <Container>
          <Row>
            <Col>
              <h2>Top 10</h2>
              {songData.length > 0 && songData.map((song, index) => (
                <SongCard key={index} song={song} SERVER_URL={SERVER_URL} isFavorite={false} getFavorites={() => this.getFavorites()} config={this.state.config}/>
              ))}
            </Col>
            <Col>
              <h2>Favorites</h2>
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

export default withAuth0(MainPage);
