import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { Modal, Button, Table, Badge } from 'react-bootstrap'; // Import Bootstrap modal components
import { imgPath } from './Constants';
import { useNavigate,Link } from 'react-router-dom';
const GeoMapMultiple = ({ surveyDataArray }) => {
  const mapRef = useRef(null);
  const [deviceInfo, setDeviceInfo] = useState([]);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [infoWindowContent, setInfoWindowContent] = useState(null); // Declare the state variable
  const [infoWindowPosition, setInfoWindowPosition] = useState(null); // Declare the state variable
  const [geofenceChosen, setGeofenceChosen] = useState(false);
  const [geofence, setGeofence] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Fetch device information from survey data
  const fetchDeviceInfo = (surveyData) => {
    const deviceData = surveyData.devices.map((device_info) => ({
      deviceId: device_info.device_id,
      batteryHealth: (
        <span className="btry-green">{device_info.battery_status} %</span>
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

  // Initialize Google Map for each surveyData
  const initMap = (surveyData, index) => {
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
    
    
      surveyDataArray.forEach((surveyData, index) => {
    const defaultPolygonCoords = surveyData.devices.map((device_info) => ({
      lat: parseFloat(device_info.latitude),
      lng: parseFloat(device_info.longitude),
      icon: device_info.device_status === false
        ? { url: `${imgPath.deactivateLoc}`, scaledSize: new window.google.maps.Size(20, 20) }
        : device_info.device_movement === 1
        ? { url: `${imgPath.gifLoc}`, scaledSize: new window.google.maps.Size(50, 50) }
        : { url: `${imgPath.loc}`, scaledSize: new window.google.maps.Size(20, 20) },
    }));
 
    const defaultPolyline = new window.google.maps.Polyline({
      path: defaultPolygonCoords,  // The array of LatLng coordinates
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
    });
    
   
    defaultPolyline.setMap(map);
    setGeofence(defaultPolygonCoords);
    setGeofenceChosen(true);

    defaultPolygonCoords.forEach((coord, index) => {
      const marker = new window.google.maps.Marker({
        position: coord,
        map: map,
        title: `Latitude: ${coord.lat}, Longitude: ${coord.lng}`,
        icon: coord.icon,
      });

      marker.addListener('click', () => {
        setSelectedPoint(coord);
        handleModalShow();
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
   });
  
    fetchDeviceInfo(surveyData);
  };

  useEffect(() => {
    if (window.google && surveyDataArray.length > 0) {
      // Initialize map for each survey data
      surveyDataArray.forEach((surveyData, index) => {
        initMap(surveyData, index);
      });
    } else {
      window.initMap = initMap;
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=drawing`;
      document.body.appendChild(script);
    }
  }, [surveyDataArray]);

  // Modal control
  const handleModalShow = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);
  let flag = 1; 
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
                <th>Pipeline Name</th>
                <th>Total Device</th>
              
              </tr>
            </thead>
            <tbody>
           
            {surveyDataArray.map((surveyData, index) =>    
            surveyData.devices.length > 0 && ( // Add the condition here
               <tr key={index}>
                     <td>{flag++}</td>
                     <td> <Link key={surveyData.survey_details.pipeline_name} to={`/pipeline/survey-details/${surveyData.survey_details.pipeline_id}`}
    >{surveyData.survey_details.pipeline_name}</Link></td>
                     <td>{surveyData.devices.length}</td>
                     
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
                <React.Fragment>
                  {geofence.map((coord, index) =>
                    coord.lat === selectedPoint.lat &&
                    coord.lng === selectedPoint.lng && (
                      <p key={index}>
                        {`Point: ${deviceInfo[index].points}`}<br />
                        Status: {deviceInfo[index].status}
                      </p>
                    )
                  )}
                </React.Fragment>
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

export default GeoMapMultiple;
