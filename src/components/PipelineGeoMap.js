import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { Modal, Button, Table, Badge } from 'react-bootstrap'; // Import Bootstrap modal components
import { imgPath } from './Constants';

const GeoMapTwo = ({ surveyData }) => {
  const mapRef = useRef(null);
  const [geofence, setGeofence] = useState([]);
  const [geofenceChosen, setGeofenceChosen] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [infoWindowContent, setInfoWindowContent] = useState(null); // Declare the state variable
  const [infoWindowPosition, setInfoWindowPosition] = useState(null); // Declare the state variable

  // Additional state for device information
  const [deviceInfo, setDeviceInfo] = useState([]);

  const fetchDeviceInfo = () => {
    //   const deviceData = [
    //     {
    //       deviceId: '749854_______',
    //       batteryHealth: <span className="btry-green">80%</span>,
    //       status: <Badge bg="success">Active</Badge>,
    //       points: '1',
    //     },
    //     {
    //       deviceId: '898734',
    //       batteryHealth: <span className="btry-green">90%</span>,
    //       status: <Badge bg="success">Active</Badge>,
    //       points: '26',
    //     },
    //     {
    //       deviceId: '321098',
    //       batteryHealth: <span className="btry-green">85%</span>,
    //       status: <Badge bg="success">Active</Badge>,
    //       points: 'C',
    //     },
    //     {
    //       deviceId: '784533',
    //       batteryHealth: <span className="btry-green">92%</span>,
    //       status: <Badge bg="success">Active</Badge>,
    //       points: '4',
    //     },
    //     {
    //       deviceId: '872983',
    //       batteryHealth: <span className="btry-green">88%</span>,
    //       status: <Badge bg="success">Active</Badge>,
    //       points: '3',
    //     },
    //     {
    //       deviceId: '387458',
    //       batteryHealth: <span className="btry-green">93%</span>,
    //       status: <Badge bg="success">Active</Badge>,
    //       points: '6',
    //     },
    //   ];
    //   setDeviceInfo(deviceData);

    const deviceData = surveyData.devices.map((device_info) => ({
      deviceId: device_info.device_id,
      batteryHealth: (
        <span className="btry-green">{device_info.battery_status}  %</span>
      ),
      status: (
        <Badge
          bg={device_info.device_status ? 'success' : 'danger'}
          className={device_info.device_movement === 1 ? 'bg-movingBtry' : ''}
        >
          {device_info.device_status ? 'Active' : 'Inactive'}
          {device_info.device_movement === 1 ? ', Moved' : ''}
        </Badge>
      ),
      points: device_info.points,
    }));
    setDeviceInfo(deviceData);
  };

  useEffect(() => {
    const initMap = () => {
         // Calculate the center point
         const latitudes = surveyData.devices.map(device => parseFloat(device.latitude));
         const longitudes = surveyData.devices.map(device => parseFloat(device.longitude));
   
         const centerLat = latitudes.reduce((acc, lat) => acc + lat, 0) / latitudes.length;
         const centerLng = longitudes.reduce((acc, lng) => acc + lng, 0) / longitudes.length;
         const zoomLevel = surveyData.survey_details.p_type === 'project' ? 14 : 19;

      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: centerLat, lng: centerLng },
        zoom: zoomLevel,
        mapTypeId: window.google.maps.MapTypeId.SATELLITE,
      });

      // Define the  polygon coordinates default
      let defaultPolygonCoords = [];
      
      if (surveyData && surveyData.devices) {
        // Extract latitude values from surveyData and use them to define polygon coordinates
     
        defaultPolygonCoords = surveyData.devices.map((device_info) => ({
          lat: parseFloat(device_info.latitude),
          lng: parseFloat(device_info.longitude),
          icon: device_info.device_status === false
            ? { url: `${imgPath.deactivateLoc}`, scaledSize: new window.google.maps.Size(20, 20) }
            : device_info.device_movement === 1
            ? { url: `${imgPath.gifLoc}`, scaledSize: new window.google.maps.Size(50, 50) }
            : { url: `${imgPath.loc}`, scaledSize: new window.google.maps.Size(20, 20) },
        }));
        const deviceData = surveyData.devices.map((device_info) => ({
          deviceId: device_info.device_id,
          batteryHealth: (
            <span className="btry-green">{device_info.battery_status}</span>
          ),
          status: <Badge bg="success">Active</Badge>,
          points: '6',
        }));
        setDeviceInfo(deviceData);
        // alert(defaultPolygonCoords);
        //console.log('GEO', defaultPolygonCoords);
      } else {
        // Use the default coordinates if surveyData is not available
      }
      /*
      // Create and display the default polygon
      const defaultPolyline = new window.google.maps.Polyline({
        paths: defaultPolygonCoords,
        geodesic: true,
        editable: false,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
      });
      defaultPolyline.setMap(map);
      */
      const defaultPolyline = new window.google.maps.Polyline({
        path: defaultPolygonCoords,  // The array of LatLng coordinates
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
      });
      
      defaultPolyline.setMap(map);  // Display the polyline on the

      setGeofence(defaultPolygonCoords);
      setGeofenceChosen(true);

      // Define a custom icon for markers
      const customIcon = {
        url: `${imgPath.loc}`, // Replace with the URL of your custom icon
        scaledSize: new window.google.maps.Size(20, 20), // Adjust the size as needed
      };
      const customIcons = [
        //{ url: `${imgPath.loc}`, scaledSize: new window.google.maps.Size(20, 20) },
        //{ url: `${imgPath.deactivateLoc}`, scaledSize: new window.google.maps.Size(20, 20) },
        { url: `${imgPath.gifLoc}`, scaledSize: new window.google.maps.Size(50, 50) },
       // { url: `${imgPath.deactivateLoc}`, scaledSize: new window.google.maps.Size(20, 20) },
       // { url: `${imgPath.loc}`, scaledSize: new window.google.maps.Size(20, 20) },
       // { url: `${imgPath.loc}`, scaledSize: new window.google.maps.Size(20, 20) },
        // Add more icons as needed
      ];
      const customIcon1 = {
        url: `${imgPath.gifLoc}`, // Set to your desired icon
        scaledSize: new window.google.maps.Size(50, 50),
      };
      // Add event listeners to each polygon coordinate with custom icon
      defaultPolygonCoords.forEach((coord, index) => {
        const marker = new window.google.maps.Marker({
          position: coord,
          map: map,
          title: `Latitude: ${coord.lat}, Longitude: ${coord.lng}`,
          icon: coord.icon, // Set the icon based on device movement and status 
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
          setInfoWindowContent(
            `Latitude: ${coord.lat}, Longitude: ${coord.lng}`
          );
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
  // console.log(surveyData);
  // Bootstrap Modal state
  const [showModal, setShowModal] = useState(false);

  // Open Bootstrap Modal
  const handleModalShow = () => setShowModal(true);

  // Close Bootstrap Modal
  const handleModalClose = () => setShowModal(false);
  if (!surveyData) {
    return <div>Loading...</div>; // or any other placeholder or loading indicator
  }
  return (
    <>
      <div ref={mapRef} style={{ height: '480px', width: '100%' }}></div>
      {geofenceChosen && (
        <>
          <h4 className="mt-4 title">Geofence Coordinates:</h4>
          <Table className="common-table" striped bordered>
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
                  <td>
                    Lat: {coord.lat} , Lng: {coord.lng}
                  </td>
                  {/* <td>782234</td>
                  <td>80%</td>
                  <td>Device</td> */}
                  {deviceInfo[index] && (
                    <>
                      <td>{deviceInfo[index].deviceId}</td>
                      <td>{deviceInfo[index].batteryHealth}</td>
                      <td>{deviceInfo[index].status} </td>
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
          <h4 className="title">Information</h4>
        </Modal.Header>
        <Modal.Body>
          {selectedPoint && (
            <>
              <p>{`Latitude: ${selectedPoint.lat}`}</p>
              <p>{`Longitude: ${selectedPoint.lng}`}</p>
              {deviceInfo.length > 0 && (
                <>
                  {geofence.map(
                    (coord, index) =>
                      coord.lat === selectedPoint.lat &&
                      coord.lng === selectedPoint.lng && (
                        <React.Fragment key={index.id}>
                          <p>{`Point: ${deviceInfo[index].points}`}</p>
                          <p>Status: {deviceInfo[index].status}</p>
                        </React.Fragment>
                      )
                  )}
                </>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default GeoMapTwo;
