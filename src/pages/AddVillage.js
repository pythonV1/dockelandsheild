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
import axios from 'axios';
import API_BASE_URL from '../config';
import withAuthRedirect from '../hoc/withAuthRedirect'; // Import the HOC
const AddVillage = () => {
  const [villageName, setVillageName] = useState('');
  const [villageID, setVillageID] = useState('');
  const [districtID, setDistrictID] = useState('');
  const [districts, setDistricts] = useState([]);
  const [taluks, setTaluks] = useState([]);
  const [talukID, setTalukID] = useState('');
  const [statusMessage, setStatusMessage] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { village } = location.state || {};
  useEffect(() => {
    if (village) {
      setVillageName(village.name);
      setVillageID(village.id);
      setDistrictID(village.district);
      setTalukID(village.taluk);
    }
  }, [village]);
  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/districts/`);
        setDistricts(response.data);
      } catch (error) {
        console.error('Error fetching districts:', error);
      }
    };
    fetchDistricts();
  }, []); // Empty dependency array, to fetch districts only once when component mounts

  useEffect(() => {
    console.log('Hello4444');
    const fetchTaluks = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/taluks/`);

        setTaluks(response.data);
        console.log('Hello', taluks);
      } catch (error) {
        console.error('Error fetching districts:', error);
      }
    };
    fetchTaluks();
  }, []);
  const handleInputChange = (e, fieldName) => {
    // Update the state based on the field name
    switch (fieldName) {
      case 'villageName':
        setVillageName(e.target.value);
        break;
      case 'talukID':
        setTalukID(e.target.value);
        break;
      case 'districtID':
        setDistrictID(e.target.value);
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

  const handleSubmit = async (event) => {
    /* */
    event.preventDefault();
    const errors = {};

    if (!villageName) {
      errors.villageName = 'Village Name is required';
    }
    if (!districtID) {
      errors.districtID = 'District is required';
    }
    if (!talukID) {
      errors.talukID = 'Taluk is required';
    }
    setFormErrors(errors);

    // If there are errors, stop form submission
    if (Object.keys(errors).length !== 0) {
      return;
    }
    try {
      if (!villageName) {
        throw new Error('Please fill in all required fields.');
      }

      if (village) {
        await axios.put(`${API_BASE_URL}/village/update/${village.id}/`, {
          id: villageID,
          name: villageName,
          district: districtID,
          taluk: talukID,
        });
      } else {
        await axios.post(`${API_BASE_URL}/village/add/`, {
          // id: districtID,
          name: villageName,
          district: districtID,
          taluk: talukID,
        });
        // setStatusMessage('Device added successfully');
      }
      navigate('/master/village');
    } catch (error) {
      console.error('Error adding/updating taluk:', error.message);
      // alert(error.message);
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
                      <Form.Label>District</Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        value={districtID}
                        onChange={(e) => handleInputChange(e, 'districtID')}
                        isInvalid={!!formErrors.districtID}
                      >
                        <option value="">Select District</option>
                        {districts.map((district) => (
                          <option key={district.id} value={district.id}>
                            {district.name}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {formErrors.districtID}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Taluk</Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        value={talukID}
                        onChange={(e) => handleInputChange(e, 'talukID')}
                        //onChange={(e) => setVillageID(e.target.value)}
                        isInvalid={!!formErrors.talukID}
                      >
                        <option>Select Taluk</option>
                        {taluks.map((taluks) => (
                          <option key={taluks.id} value={taluks.id}>
                            {taluks.name}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {formErrors.talukID}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Village</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Village"
                        value={villageName}
                        onChange={(e) => handleInputChange(e, 'villageName')}
                        isInvalid={!!formErrors.villageName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.villageName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col lg={12} className="text-center">
                    <Button type="submit" className="btn-main me-2">
                      Submit
                    </Button>
                    <Button
                      as={Link}
                      to="/master/village"
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

export default withAuthRedirect(AddVillage);
