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
const AddTaluk = () => {
  const [talukName, setTalukName] = useState('');
  const [taluktID, setTalukID] = useState('');
  const [districtID, setDistrictID] = useState('');
  const [statusMessage, setStatusMessage] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { taluk } = location.state || {};
  useEffect(() => {
    if (taluk) {
      setTalukName(taluk.name);
      setTalukID(taluk.id);
      setDistrictID(taluk.district);
    }
  }, [taluk]);

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
  const handleInputtalukChange = (e) => {
    // Clear the error message when user starts typing
    if (formErrors.talukName) {
      setFormErrors({ ...formErrors, talukName: '' });
    }
    setTalukName(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    /* */
    const errors = {};
    if (!talukName) {
      errors.talukName = 'Taluk name is required';
    }
    // Set the form errors
    setFormErrors(errors);

    // If there are errors, stop form submission
    if (Object.keys(errors).length !== 0) {
      return;
    }
    //event.preventDefault();
    try {
      if (!talukName) {
        throw new Error('Please fill in all required fields.');
      }

      if (taluk) {
        await axios.put(`${API_BASE_URL}/taluk/update/${taluk.id}/`, {
          id: districtID,
          name: talukName,
          district: districtID,
        });
      } else {
        await axios.post(`${API_BASE_URL}/taluk/add/`, {
          // id: districtID,
          name: talukName,
          district: districtID,
        });
        // setStatusMessage('Device added successfully');
      }
      navigate('/master/taluk');
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
                <Row className="g-2 justify-content-center">
                  <Col lg={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>District</Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        value={districtID}
                        onChange={(e) => setDistrictID(e.target.value)}
                        required
                      >
                        <option value="">Select District</option>
                        {districts.map((district) => (
                          <option key={district.id} value={district.id}>
                            {district.name}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Taluk</Form.Label>
                      <Form.Control
                        type="text"
                        value={talukName}
                        placeholder="Taluk"
                        onChange={handleInputtalukChange}
                        isInvalid={!!formErrors.talukName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.talukName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col lg={12} className="text-center">
                    <Button type="submit" className="btn-main me-2">
                      Submit
                    </Button>
                    <Button as={Link} to="/master/taluk" className="btn-cancel">
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

export default withAuthRedirect(AddTaluk);
