import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { Modal, Button, Table, Badge } from 'react-bootstrap'; // Import Bootstrap modal components
import { imgPath } from './Constants';

const GeoMap = () => {
  const mapRef = useRef(null);
  const [geofence, setGeofence] = useState([]);
  const [geofenceChosen, setGeofenceChosen] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [infoWindowContent, setInfoWindowContent] = useState(null); // Declare the state variable
  const [infoWindowPosition, setInfoWindowPosition] = useState(null); // Declare the state variable

  // Additional state for device information
  const [deviceInfo, setDeviceInfo] = useState([]);

  const fetchDeviceInfo = () => {
    const deviceData = [
      { deviceId: '749854', batteryHealth: <span className='btry-green'>80%</span>, status: <Badge bg="success">Active</Badge>, points: '1' },
      { deviceId: '898734', batteryHealth: '', status: <Badge bg="danger">Deactive</Badge>, points: '3' },
      { deviceId: '321098', batteryHealth: <span className='btry-green'>85%</span>, status: <Badge className='bg-movingBtry'>Active, Moved</Badge>, points: '45' },
      { deviceId: '784533', batteryHealth: '', status: <Badge bg="danger">Deactive</Badge>, points: '2' },
      { deviceId: '872983', batteryHealth: <span className='btry-yellow'>63%</span>, status: <Badge bg="success">Active</Badge>, points: '5' },
      { deviceId: '387458', batteryHealth: <span className='btry-orange'>24%</span>, status: <Badge bg="success">Active</Badge>, points: '6' },
    ];

    setDeviceInfo(deviceData);
  };

  useEffect(() => {
    const initMap = () => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 9.97437139699047, lng: 78.0987950698302 },
        zoom: 19,
        mapTypeId: window.google.maps.MapTypeId.SATELLITE,
      });

      // Define the default polygon coordinates
      const defaultPolygonCoords = [
        { lat: 9.97437139699047, lng: 78.0987950698302 },
        { lat: 9.974401372913931, lng: 78.09938030974497 },
        { lat: 9.974025388999538, lng: 78.09940204971062 },
        { lat: 9.974021106720103, lng: 78.0990768198247 },
        { lat: 9.974124737866472, lng: 78.09907247183156 },
        { lat: 9.97411274748759, lng: 78.09880811384944 },
        // Add more coordinates as needed
      ];
      const customIcons = [
        { url: `${imgPath.loc}`, scaledSize: new window.google.maps.Size(20, 20) },
        { url: `${imgPath.deactivateLoc}`, scaledSize: new window.google.maps.Size(20, 20) },
        { url: `${imgPath.gifLoc}`, scaledSize: new window.google.maps.Size(50, 50) },
        { url: `${imgPath.deactivateLoc}`, scaledSize: new window.google.maps.Size(20, 20) },
        { url: `${imgPath.loc}`, scaledSize: new window.google.maps.Size(20, 20) },
        { url: `${imgPath.loc}`, scaledSize: new window.google.maps.Size(20, 20) },
        // Add more icons as needed
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


      // Add event listeners to each polygon coordinate with custom icon
      defaultPolygonCoords.forEach((coord, index) => {
        const marker = new window.google.maps.Marker({
          position: coord,
          map: map,
          title: `Latitude: ${coord.lat}, Longitude: ${coord.lng}`,
          icon: customIcons[index % customIcons.length],
        });

        marker.addListener('click', () => {
          setSelectedPoint(coord);
          handleModalShow();
          // Assuming index is the corresponding index in the geofence array
          const deviceIndex = index;
          if (deviceInfo.length > 0 && deviceInfo[deviceIndex]) {
            setInfoWindowContent(
              `Latitude: ${coord.lat}, Longitude: ${coord.lng}\nDevice ID: ${deviceInfo[deviceIndex].deviceId}`
            );
            setInfoWindowPosition(coord);
          }
        });

        marker.addListener('mouseover', () => {
          setInfoWindowContent(`Latitude: ${coord.lat}, Longitude: ${coord.lng}`);
          setInfoWindowPosition(coord);
        });

        marker.addListener('mouseout', () => {
          setInfoWindowContent(null);
        });
      });
      fetchDeviceInfo();
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
          <Table className='common-table' striped bordered>
            <thead>
              <tr>
                <th>Sl No</th>
                <th>Geo Location</th>
                <th>Device Id</th>
                <th>Battery health</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {geofence.map((coord, index) => (
                <tr key={index.id}>
                  <td>{index + 1}</td>
                  <td>Lat: {coord.lat} , Lng: {coord.lng}</td>
                  {deviceInfo[index] && (
                    <>
                      <td>{deviceInfo[index].deviceId}</td>
                      <td>{deviceInfo[index].batteryHealth}</td>
                      <td>{deviceInfo[index].status}</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
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
              {deviceInfo.length > 0 && (
                <>
                  {geofence.map((coord, index) => (
                    coord.lat === selectedPoint.lat && coord.lng === selectedPoint.lng && (
                      <React.Fragment key={index.id}>
                        <p>{`Point: ${deviceInfo[index].points}`}</p>
                        <p>Status: {deviceInfo[index].status}</p>
                      </React.Fragment>
                    )
                  ))}
                </>
              )}
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

export default GeoMap;
