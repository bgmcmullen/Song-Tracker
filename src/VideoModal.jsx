import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



export default function VideoModal(props) {


  function convertToEmbedUrl(url) {
    // Find the index of 'watch?v=' in the URL
    const startIndex = url.indexOf('watch?v=');
    
    if (startIndex !== -1) {
      // Extract the video ID from the URL
      const videoId = url.substring(startIndex + 'watch?v='.length);
      
      // Construct the embed URL
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      
      return embedUrl;
    } else {
      // If 'watch?v=' is not found, return the original URL
      return url;
    }
  }


  return (
    <>
      <Modal dialogClassName="modal-90w"
       show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.songTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="video-responsive">
            <iframe
              width="560"
              height="315"
              src={`${convertToEmbedUrl(props.videoUrl)}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )


}