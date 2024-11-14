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

const AddProjectGeolocation = () => {
  const customer_id = localStorage.getItem('id');
  const [geoLocations, setGeoLocations] = useState([{ id: Date.now(), latitude: null, longitude: null }]);
  const [pipelineId, setPipelineId] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [referenceName, setReferenceName] = useState('');
  const [pipelines, setPipelines] = useState([]); // State to store project list
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { projectgeolocation } = location.state || {};
  useEffect(() => {
    // Fetch project data
    fetchPipelines();
  }, []);
  useEffect(() => {
    if (projectgeolocation) {
      setLatitude(projectgeolocation.latitude);
      setLongitude(projectgeolocation.longitude);
      setReferenceName(projectgeolocation.refference_name);
      //setProjects(projectgeolocation.projects);
     
    }
  }, [projectgeolocation]);

  const fetchPipelines = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/pipelines/customer/${customer_id}/`); // Adjust endpoint as needed
      setPipelines(response.data); // Update projects state with data from API
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = {};
  
    if (!pipelineId) {
      errors.pipelineId = 'Project is required';
    }
  
    // Validate latitude
    if (!latitude) {
      errors.latitude = 'Latitude is required';
    } 
  
    // Validate longitude
    if (!longitude) {
      errors.longitude = 'Longitude is required';
    } 
  
    setFormErrors(errors);
  
    // If there are no errors, proceed with the API call
    if (Object.keys(errors).length === 0) {
      try {
        const payload = {
          pipeline: pipelineId,
          latitude,
          longitude,
          refference_name: referenceName,
        };
  
        if (projectgeolocation) {
          await axios.put(
            `${API_BASE_URL}/pipelinegeolocation/update/${projectgeolocation.id}/`,
            payload,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
        } else {
          await axios.post(
            `${API_BASE_URL}/pipelinegeolocation/add/${pipelineId}/`,
            payload,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
        }
  
        navigate('/project-geolocation');
      } catch (error) {
        console.error('Error adding project-geolocation:', error.message);
      }
    }
  };
  
  
  


  return (
    <Container fluid className="section">
      <Row className="g-3 justify-content-center">
        <Col lg={12} className="mb-4">
          <h2>Add Pipeline Geolocation</h2>
        </Col>
        <Col lg={10}>
          <Card className="main-card">
            <CardBody>
              <Form onSubmit={handleSubmit} enctype="multipart/form-data">
                <Row className="g-2">
                  {/* Project Selection Dropdown */}
                  <Col lg={6}>
                  <Form.Group className="mb-3">
  <Form.Label>Select Pipeline</Form.Label>
  <Form.Control
    as="select"
    value={pipelineId}
    onChange={(e) => setPipelineId(e.target.value)}
    isInvalid={!!formErrors.pipelineId}
  >
    <option value="">Select a pipeline</option>
    {pipelines.map((pipeline) => (
      <option key={pipeline.pipeline_id} value={pipeline.pipeline_id}>
        {pipeline.pipeline_name}
      </option>
    ))}
  </Form.Control>
  <Form.Control.Feedback type="invalid">
    {formErrors.pipelineId}
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
                    <Button as={Link} to="/project-geolocation" className="btn-cancel">
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

export default withAuthRedirect(AddProjectGeolocation);
