import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Row,
} from 'react-bootstrap';

import { Link, useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../config';
import withAuthRedirect from '../hoc/withAuthRedirect';

const AddPropertyGeolocation = () => {
  const customer_id = localStorage.getItem('id');
  const [geoLocations, setGeoLocations] = useState([{ id: Date.now(), latitude: null, longitude: null }]);
  const [propertyId, setPropertyId] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [referenceName, setReferenceName] = useState('');
  const [properties, setProperties] = useState([]); // State to store project list
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { propertygeolocation } = location.state || {};
  useEffect(() => {
    // Fetch project data
    fetchProperties();
  }, []);
  useEffect(() => {
    if (propertygeolocation) {
      setLatitude(propertygeolocation.latitude);
      setLongitude(propertygeolocation.longitude);
      setReferenceName(propertygeolocation.refference_name);
      //setpropertys(propertygeolocation.propertys);
     
    }
  }, [propertygeolocation]);

  const fetchProperties = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/properties/customer/${customer_id}/`); // Adjust endpoint as needed
      setProperties(response.data); // Update projects state with data from API
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = {};
  
    // Check if propertyId is selected
    if (!propertyId) {
      errors.propertyId = 'Property is required';
    }
  
    // Check if latitude and longitude are provided
    if (!latitude) {
      errors.latitude = 'Latitude is required';
    }
  
    if (!longitude) {
      errors.longitude = 'Longitude is required';
    }
  
    // Set form errors if any
    setFormErrors(errors);
  
    // If there are no errors, proceed with the form submission
    if (Object.keys(errors).length === 0) {
      try {
        // Create a JSON payload
        const payload = {
          property: propertyId,
          latitude,
          longitude,
          refference_name: referenceName,
        };
  
        if (propertygeolocation) {
          // Update existing geolocation
          await axios.put(
            `${API_BASE_URL}/propertygeolocation/update/${propertygeolocation.id}/`,
            payload,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
        } else {
          // Add new geolocation
          await axios.post(
            `${API_BASE_URL}/propertygeolocation/add/${propertyId}/`,
            payload,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
        }
  
        navigate('/property-geolocation');
      } catch (error) {
        console.error('Error adding property geolocation:', error.message);
      }
    }
  };
  
  const handleSubmit_______ = async (event) => {
    event.preventDefault();
    const errors = {};
  
    if (!propertyId) {
      errors.propertyId = 'properties is required';
    }
  
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      try {
        // Create a JSON payload
        const payload = {
          property: propertyId,
          latitude,
          longitude,
          refference_name: referenceName,
        };
  
        if (propertygeolocation) {
          // Update existing geolocation
          await axios.put(
            `${API_BASE_URL}/propertygeolocation/update/${propertygeolocation.id}/`, // Pass projectId for update
            payload, // Use payload instead of formData
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
        } else {
          // Add new geolocation
          await axios.post(`${API_BASE_URL}/propertygeolocation/add/${propertyId}/`, payload, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
        }
  
        navigate('/property-geolocation');
      } catch (error) {
        console.error('Error adding propert-geolocation:', error.message);
      }
    }
  };
  
  


  return (
    <Container fluid className="section">
      <Row className="g-3 justify-content-center">
        <Col lg={12} className="mb-4">
          <h2>Add property Geolocation</h2>
        </Col>
        <Col lg={10}>
          <Card className="main-card">
            <CardBody>
              <Form onSubmit={handleSubmit} enctype="multipart/form-data">
                <Row className="g-2">
                  {/* Project Selection Dropdown */}
                  <Col lg={6}>
                  <Form.Group className="mb-3">
  <Form.Label>Select property</Form.Label>
  <Form.Control
    as="select"
    value={propertyId}
    onChange={(e) => setPropertyId(e.target.value)}
    isInvalid={!!formErrors.propertyId}
  >
    <option value="">Select a property</option>
    {properties.map((property) => (
      <option key={property.property_id} value={property.property_id}>
        {property.property_name}
      </option>
    ))}
  </Form.Control>
  <Form.Control.Feedback type="invalid">
    {formErrors.propertyId}
  </Form.Control.Feedback>
</Form.Group>

                    
                    
                  </Col>

                  <Col lg={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Latitude</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter latitude"
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                        isInvalid={!!formErrors.latitude}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.latitude}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col lg={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Longitude</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter longitude"
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                        isInvalid={!!formErrors.longitude}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.longitude}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col lg={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Reference Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter reference name"
                        value={referenceName}
                        onChange={(e) => setReferenceName(e.target.value)}
                        isInvalid={!!formErrors.referenceName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.referenceName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col lg={12} className="text-center">
                    <Button type="submit" className="btn-main me-2">
                      Submit
                    </Button>
                    <Button as={Link} to="/property-geolocation" className="btn-cancel">
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

export default withAuthRedirect(AddPropertyGeolocation);
