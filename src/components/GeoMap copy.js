import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { Modal, Button } from 'react-bootstrap'; // Import Bootstrap modal components
import { imgPath } from './Constants';

const GeoMapTwo = () => {
  const mapRef = useRef(null);
  const [geofence, setGeofence] = useState([]);
  const [geofenceChosen, setGeofenceChosen] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [infoWindowContent, setInfoWindowContent] = useState(null); // Declare the state variable
  const [infoWindowPosition, setInfoWindowPosition] = useState(null); // Declare the state variable

  useEffect(() => {
    const initMap = () => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 9.286700326184762, lng: 79.15421339506354 },
        zoom: 18,
        mapTypeId: window.google.maps.MapTypeId.MAP,
      });

      // Define the default polygon coordinates
      const defaultPolygonCoords = [
        { lat: 9.286700326184762, lng: 79.15421339506354 },
        { lat: 9.286415379407138, lng: 79.15475345305232 },
        { lat: 9.286128835480879, lng: 79.1546387886148 },
        { lat: 9.286134594793916, lng: 79.1545517332303 },
        { lat: 9.285868238846316, lng: 79.15425040427135 },
        { lat: 9.285989341823905, lng: 79.15398687723209 },
        // Add more coordinates as needed
      ];

      // Create and display the default polygon
      const defaultPolygon = new window.google.maps.Polygon({
        paths: defaultPolygonCoords,
        editable: false,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
      });
      defaultPolygon.setMap(map);

      setGeofence(defaultPolygonCoords);
      setGeofenceChosen(true);

      // Define a custom icon for markers
      const customIcon = {
        url: `${imgPath.loc}`, // Replace with the URL of your custom icon
        scaledSize: new window.google.maps.Size(20, 20), // Adjust the size as needed
      };

      // Add event listeners to each polygon coordinate with custom icon
      defaultPolygonCoords.forEach((coord, index) => {
        const marker = new window.google.maps.Marker({
          position: coord,
          map: map,
          title: `Latitude: ${coord.lat}, Longitude: ${coord.lng}`,
          icon: customIcon, // Set the custom icon
        });

        marker.addListener('click', () => {
          setSelectedPoint(coord);
          handleModalShow();
        });

        marker.addListener('mouseover', () => {
          setInfoWindowContent(`Latitude: ${coord.lat}, Longitude: ${coord.lng}`);
          setInfoWindowPosition(coord);
        });

        marker.addListener('mouseout', () => {
          setInfoWindowContent(null);
        });
      });
    };

    // Load the Google Maps API script and call initMap when it's ready
    if (window.google) {
      initMap();
    } else {
      // Define the callback function to execute when the API is loaded
      window.initMap = initMap;
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=drawing`;
      document.body.appendChild(script);
    }
  }, []);

  // Bootstrap Modal state
  const [showModal, setShowModal] = useState(false);

  // Open Bootstrap Modal
  const handleModalShow = () => setShowModal(true);

  // Close Bootstrap Modal
  const handleModalClose = () => setShowModal(false);

  return (
    <>
      <div ref={mapRef} style={{ height: '480px', width: '100%' }}></div>
      {geofenceChosen && (
        <>
          <h4 className='mt-4 title'>Geofence Coordinates:</h4>
          <ul className='geofence-list'>
            {geofence.map((coord, index) => (
              <li key={index.id}>
                <FontAwesomeIcon icon={faArrowRight} /> {`Latitude: ${coord.lat}, Longitude: ${coord.lng}`}
              </li>
            ))}
          </ul>
        </>
      )}

      {/* Bootstrap Modal */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <h4 className='title'>information</h4>
        </Modal.Header>
        <Modal.Body>
          {selectedPoint && (
            <>
              <p>{`Latitude: ${selectedPoint.lat}`}</p>
              <p>{`Longitude: ${selectedPoint.lng}`}</p>
              {/* Add other information as needed */}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default GeoMapTwo;
