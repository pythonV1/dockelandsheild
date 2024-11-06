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
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import PageHelmet from '../components/PageHelmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import API_BASE_URL from '../config';
import withAuthRedirect from '../hoc/withAuthRedirect'; // Import the HOC
//axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';
// Log all request interceptors
axios.defaults.xsrfHeaderName = 'X-CSRFToken'; // Set the X-CSRFToken header name
axios.defaults.xsrfCookieName = 'csrftoken'; // Set the CSRF token cookie name

axios.interceptors.request.use((request) => {
  console.log('Request interceptor:', request);
  return request;
});

// Log all response interceptors
axios.interceptors.response.use((response) => {
  console.log('Response interceptor:', response);
  return response;
});
axios.interceptors.request.eject(axios.interceptors.request.use(() => {}));

const AddProjectRegistration = () => {
  const [geoLocations, setGeoLocations] = useState([
    { id: Date.now(), latitude: null, longitude: null },
  ]);
  // const [geoLocations, setGeoLocations] = useState([
  //   { id: Date.now(), latitude: '', longitude: '' },
  // ]);
  const [projectRegistrationID, setProjectRegistrationID] = useState('');
  const [projectState, setprojectStateName] = useState('');
  const [projectCity, setprojectCityName] = useState('');
  
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setprojectDescription] = useState('');
  

  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { projectregistration } = location.state || {};
  const customer_id = localStorage.getItem('id');
  useEffect(() => {
   
   // fetchDistricts();
  }, []);
  useEffect(() => {
    if (projectregistration) {
      setProjectRegistrationID(projectregistration.id);
      setProjectName(projectregistration.Project_name);
      setprojectStateName(projectregistration.project_state);
      setprojectCityName(projectregistration.project_city);
      setprojectDescription(projectregistration.project_descriptions);
     
    }
  }, [projectregistration]);

  const addGeoLocation = () => {
    setGeoLocations((prevLocations) => [
      ...prevLocations,
      { id: Date.now(), latitude: null, longitude: null },
    ]);
  };

  const handleLatitudeChange = (index, value) => {
    setGeoLocations((prevLocations) => {
      const updatedLocations = [...prevLocations];
      updatedLocations[index] = {
        ...updatedLocations[index],
        latitude: value,
      };
      return updatedLocations;
    });
  };

  const handleLongitudeChange = (index, value) => {
    setGeoLocations((prevLocations) => {
      const updatedLocations = [...prevLocations];
      updatedLocations[index] = {
        ...updatedLocations[index],
        longitude: value,
      };
      return updatedLocations;
    });
  };

  const deleteGeoLocation = (id) => {
    setGeoLocations((prevLocations) =>
      prevLocations.filter((location) => location.id !== id)
    );
  };


 
  // const fetchVillages = (taluksID) => {
  //   // Make an API request to fetch taluks based on the district ID
  //   axios
  //     .get(`${API_BASE_URL}/villages/${taluksID}/`)
  //     .then((response) => {
  //       // Handle the response data and update the taluks state accordingly
  //       setVillages(response.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching taluks:', error);
  //     });
  // };

  const handleChange = (e, fieldName) => {
    // Update the state based on the field name
    switch (fieldName) {
      case 'projectName':
        setProjectName(e.target.value);
        break;
      case 'projectState':
        setprojectStateName(e.target.value);
        break;
      case 'projectCity':
          setprojectCityName(e.target.value);
          break;
      case 'projectDescription':
        setprojectDescription(e.target.value);
        break;

      // Add cases for other fields if needed
      default:
        break;
    }
    // Clear the form error for the corresponding field
    clearFormError(fieldName);
  };

  const clearFormError = (fieldName) => {
    setFormErrors((prevErrors) => {
      return { ...prevErrors, [fieldName]: '' };
    });
  };
  // Validation functions for latitude and longitude
  const isValidLatitude = (latitude) => {
    return !isNaN(latitude) && latitude >= -90 && latitude <= 90;
  };

  const isValidLongitude = (longitude) => {
    return !isNaN(longitude) && longitude >= -180 && longitude <= 180;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = {};
    if (!projectName) {
      errors.projectName = 'Project Name is required';
    }
    if (!projectState) {
      errors.projectState = 'Project State is required';
    }
    if (!projectCity) {
      errors.projectCity = 'Project City is required';
    }
    
    
    // Set the form errors
    setFormErrors(errors);
    try {
      const formData = new FormData();
      formData.append('project_name', projectName);
      formData.append('project_state', projectState);
      formData.append('project_city', projectCity);
      formData.append('project_descriptions', projectDescription);
      formData.append('customer_id', customer_id);
      
      //formData.append('geolocations', JSON.stringify(geoLocations));

      if (projectregistration) {
        await axios.put(
          `${API_BASE_URL}/projectregistration/update/${projectregistration.project_id}/`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
      } else {
        await axios.post(`${API_BASE_URL}/projectregistration/add/`, formData);
      }
      navigate('/project-registration');
    } catch (error) {
      console.error(
        'Error adding/updating project-registration:',
        error.message
      );
      // Display error message to user
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
              <Form
                className="main-form"
                onSubmit={handleSubmit}
                enctype="multipart/form-data"
              >
                <Row className="g-2">
                  <Col lg={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Project Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Property Name"
                        value={projectName}
                        onChange={(e) => handleChange(e, 'projectName')}
                        isInvalid={!!formErrors.projectName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.projectName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Project State</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Property Name"
                        value={projectState}
                        onChange={(e) => handleChange(e, 'projectState')}
                        isInvalid={!!formErrors.projectState}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.projectState}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Project City</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Property City"
                        value={projectCity}
                        onChange={(e) => handleChange(e, 'projectCity')}
                        isInvalid={!!formErrors.projectCity}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.projectCity}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
  <Form.Group className="mb-3">
    <Form.Label>Project Description</Form.Label>
    <Form.Control
      as="textarea"
      rows={1}
      placeholder="Provide a brief description of the project"
      value={projectDescription}
      onChange={(e) => handleChange(e, 'projectDescription')}
    />
  </Form.Group>
</Col>
                  
                 
                 
                 
           
                 
                  <Col lg={12} className="text-center">
                    <Button type="submit" className="btn-main me-2">
                      Submit
                    </Button>
                    <Button
                      as={Link}
                      to="/project-registration"
                      className="btn-cancel"
                    >
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

export default withAuthRedirect(AddProjectRegistration);
