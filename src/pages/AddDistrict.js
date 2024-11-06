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

const AddDistrict = () => {
  const [districtName, setDistrictName] = useState('');
  const [statusMessage, setStatusMessage] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { district } = location.state || {};

  useEffect(() => {
    if (district) {
      setDistrictName(district.name);
    }
  }, [district]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate the form inputs
    const errors = {};
    if (!districtName) {
      errors.districtName = 'District name is required';
    }

    // Set the form errors
    setFormErrors(errors);

    // If there are errors, stop form submission
    if (Object.keys(errors).length !== 0) {
      return;
    }

    try {
      if (district) {
        await axios.put(`${API_BASE_URL}/district/update/${district.id}/`, {
          name: districtName,
        });
      } else {
        await axios.post(`${API_BASE_URL}/district/add/`, {
          name: districtName,
        });
      }
      navigate('/master/district');
    } catch (error) {
      console.error('Error adding/updating district:', error.message);
      // Handle error
    }
  };

  const handleInputChange = (e) => {
    // Clear the error message when user starts typing
    if (formErrors.districtName) {
      setFormErrors({ ...formErrors, districtName: '' });
    }
    setDistrictName(e.target.value);
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
                  <Col lg={7}>
                    <Form.Group className="mb-3">
                      <Form.Label>District</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="District"
                        value={districtName}
                        onChange={handleInputChange}
                        isInvalid={!!formErrors.districtName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.districtName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col lg={12} className="text-center">
                    <Button type="submit" className="btn-main me-2">
                      Submit
                    </Button>
                    <Button
                      as={Link}
                      to="/master/district"
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

export default withAuthRedirect(AddDistrict);
