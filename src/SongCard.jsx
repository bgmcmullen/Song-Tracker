import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';

export default function SongCard(props) {
  return (
    <>
      <Card style={{ width: '50%' }}>
        <Card.Img variant="top" src={props.img} />
        <Card.Body style={{ padding: '0px' }}>
          <Card.Title>{props.songTitle}</Card.Title>
          <Card.Text>
          <Accordion>
        <Accordion.Item eventKey="0" style={{ margin: '0px' }}>
          <Accordion.Header>Description</Accordion.Header>
          <Accordion.Body>
            {props.songDescription}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>

    </>
  )

}