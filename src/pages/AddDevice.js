import React, { useState, useEffect } from 'react'; 
import { Button, Card, CardBody, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import PageHelmet from '../components/PageHelmet';
import axios from 'axios';
import API_BASE_URL from '../config';
import withAuthRedirect from '../hoc/withAuthRedirect'; // Import the HOC

const AddDevice = ({ setStatusMessage }) => {
  const [deviceID, setDeviceID] = useState('');
  const [devicetypes, setDeviceTypes] = useState([]);
  const [device_type_id, setDeviceTypeID] = useState('');
  const [deviceStatus, setDeviceStatus] = useState(false); // New state for device status
  const [deviceMovement, setDeviceMovement] = useState(0); // New state for device status
  const [errorMessage, setErrorMessage] = useState(''); // State for duplicate device ID error
  const navigate = useNavigate();
  const location = useLocation();
  const { device } = location.state || {};
  const customer_id = localStorage.getItem('id');

  useEffect(() => {
    
    const fetchdevicetypes= async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/devicetypes/`
        ); // Make GET request to the API
        //console.log('Error fetching device data:');
       
        setDeviceTypes(response.data); // Update state with fetched device data
        console.log("vineeshddddddddddddddddddd1234")
        console.log(response.data)
        console.log("vineeshddddddddddddddddddd1234")
        console.log(devicetypes)
        console.log("ddddddddddddddddddd")
      } catch (error) {
        console.error('Error fetching device data:', error);
      }
    };

    fetchdevicetypes(); //
    
    if (device) {
      setDeviceID(device.device_id);
      setDeviceTypeID(device.device_type_id);
      setDeviceStatus(device.device_status); // Set initial status if editing
      setDeviceMovement(device.device_movement); // Set initial status if editing
    }
  
  }, [device]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!deviceID || !device_type_id) {
        throw new Error('Please fill in all required fields.');
      }

      // Check for duplicate device ID
      const response = await axios.get(`${API_BASE_URL}/device/check-duplicate/`, {
        params: { device_id: deviceID },
      });

      if (response.data.isDuplicate) {
        if (!device || deviceID !== device.device_id) {
        setErrorMessage('This Device ID is already in use. Please choose another.');
        return; // Stop further submission if duplicate found
      }
      }

      setErrorMessage(''); // Clear any previous error message

      // Proceed with adding or updating device
      if (device) {
        await axios.put(`${API_BASE_URL}/device/update/${device.tab_id}/`, {
          device_id: deviceID,
          device_type: device_type_id,
          device_status: deviceStatus, // Include device status
          device_movement: deviceMovement, // Include device status
        });
      } else {
        await axios.post(`${API_BASE_URL}/device/add/`, {
          device_id: deviceID,
          device_type: device_type_id,
          customer_id: customer_id,
          device_status: deviceStatus, // Include device status
          device_movement: deviceMovement, // Include device status
        });
      }
      navigate('/master/devices');
    } catch (error) {
      console.error('Error adding/updating device:', error.message);
    }
  };

  return (
    <Container fluid className="section">
      <PageHelmet />
      <Row className="g-3 justify-content-center">
        <Col lg={12} className="mb-4">
          <PageTitle />
        </Col>
        <Col lg={10}>
          <Card className="main-card">
            <CardBody>
              <Form className="main-form" onSubmit={handleSubmit}>
                <Row className="g-2">
                  <Col lg={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Device ID</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Device ID"
                        value={deviceID}
                        onChange={(e) => setDeviceID(e.target.value)}
                        required
                      />
                      {errorMessage && (
                        <Form.Text className="text-danger">
                          {errorMessage}
                        </Form.Text>
                      )}
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Device Type</Form.Label>
                      <Form.Select 
  aria-label="Select Device Type"
  value={device_type_id}
  onChange={(e) => setDeviceTypeID(e.target.value)}
  required
>
  <option value="">Select Device Type</option>
  {devicetypes.map((device) => (
    <option key={device.id} value={device.id}>
      {device.name}
    </option>
  ))}
</Form.Select>
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="checkbox"
                        label="Device Status"
                        checked={deviceStatus}
                        onChange={(e) => setDeviceStatus(e.target.checked)}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
  <Form.Group className="mb-3">
    <Form.Check
      type="checkbox"
      label="Device Movement"
      checked={deviceMovement === 1} // Convert numeric value to boolean for the checkbox
      onChange={(e) => setDeviceMovement(e.target.checked ? 1 : 0)} // Convert boolean to numeric value
    />
  </Form.Group>
</Col>

                
                  <Col lg={12} className="text-center">
                    <Button type="submit" className="btn-main me-2">
                      Submit
                    </Button>
                    <Button as={Link} to="/master/devices" className="btn-cancel">
                      Cancel
                    </Button>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default withAuthRedirect(AddDevice);
