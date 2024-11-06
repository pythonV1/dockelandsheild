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
const AddCustomer = () => {
  const [customerID, setCustomerID] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [email_id, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [aadharNumber, setAadharNumber] = useState('');
  const [address, setAddress] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { customer } = location.state || {};

  useEffect(() => {
    if (customer) {
      setCustomerID(customer.customer_id);
      setCustomerName(customer.name);
      setEmail(customer.email);
      setMobileNumber(customer.mobile_number);
      setAadharNumber(customer.aadhar_number);
      setAddress(customer.address);
    }
  }, [customer]);
  const handleInputChange = (e, fieldName) => {
    // Update the state based on the field name
    switch (fieldName) {
      case 'customerName':
        setCustomerName(e.target.value);
        break;
      case 'email_id':
        setEmail(e.target.value);
        break;
      case 'mobileNumber':
        setMobileNumber(e.target.value);
        break;
      case 'aadharNumber':
        setAadharNumber(e.target.value);
        break;
      case 'address':
        setAddress(e.target.value);
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
    event.preventDefault();
    const errors = {};

    if (!customerName) {
      errors.customerName = 'Customer Name is required';
    }
    if (!email_id) {
      errors.email_id = 'Email is required';
    }
    if (!mobileNumber) {
      errors.mobileNumber = 'Mobile Number is required';
    }
    if (!aadharNumber) {
      errors.aadharNumber = 'Aadhar Number  is required';
    }
    if (!address) {
      errors.address = 'Address  is required';
    }
    setFormErrors(errors);
    // If there are errors, stop form submission
    if (Object.keys(errors).length !== 0) {
      return;
    }
    try {
      if (!customerName) {
        throw new Error('Please fill in all required fields.');
      }

      if (customer) {
        await axios.put(
          `${API_BASE_URL}/customer/update/${customer.customer_id}/`,
          {
            customer_id: customerID,
            name: customerName,
            email: email_id,
            mobile_number: mobileNumber,
            aadhar_number: aadharNumber,
            address: address,
          }
        );
      } else {
        await axios.post(`${API_BASE_URL}/customer/add/`, {
          // id: districtID,
          name: customerName,
          email: email_id,
          mobile_number: mobileNumber,
          aadhar_number: aadharNumber,
          address: address,
        });
        // setStatusMessage('Device added successfully');
      }
      navigate('/customers');
    } catch (error) {
      console.error('Error adding/updating customer:', error.message);
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
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Name"
                        value={customerName}
                        onChange={(e) => handleInputChange(e, 'customerName')}
                        isInvalid={!!formErrors.customerName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.customerName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        value={email_id}
                        onChange={(e) => handleInputChange(e, 'email_id')}
                        isInvalid={!!formErrors.email_id}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.email_id}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Mobile Number</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Mobile Number"
                        value={mobileNumber}
                        onChange={(e) => handleInputChange(e, 'mobileNumber')}
                        isInvalid={!!formErrors.mobileNumber}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.mobileNumber}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Aadhar Number</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Aadhar Number"
                        value={aadharNumber}
                        onChange={(e) => handleInputChange(e, 'aadharNumber')}
                        isInvalid={!!formErrors.aadharNumber}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.aadharNumber}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col lg={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        placeholder="Address"
                        value={address}
                        onChange={(e) => handleInputChange(e, 'address')}
                        isInvalid={!!formErrors.address}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.address}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col lg={12} className="text-center">
                    <Button type="submit" className="btn-main me-2">
                      Submit
                    </Button>
                    <Button as={Link} to="/customers" className="btn-cancel">
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

export default withAuthRedirect(AddCustomer);
