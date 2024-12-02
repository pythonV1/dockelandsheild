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
import withAuthRedirect from '../hoc/withAuthRedirect';

const AddCustomer = ({ currentUser }) => {
  const [customerID, setCustomerID] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [email_id, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [aadharNumber, setAadharNumber] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setCPassword] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { customer } = location.state || {};
  const token = localStorage.getItem('token');
  const customer_type = localStorage.getItem('customer_type');
  const customer_id = localStorage.getItem('id');
  const company_name = localStorage.getItem('company_name');
  console.log("Token from localStorage:", token); // Check if this prints the token correctly

  useEffect(() => {
    if (customer) {
      setCustomerID(customer.id);
      setCustomerName(customer.name);
      setEmail(customer.email);
      setMobileNumber(customer.mobile_number);
      setAadharNumber(customer.aadhar_number);
      setAddress(customer.address);
    }
  }, [customer]);

  const handleInputChange = (e, fieldName) => {
    const value = e.target.value;
    switch (fieldName) {
      case 'customerName':
        setCustomerName(value);
        break;
      case 'email_id':
        setEmail(value);
        break;
      case 'mobileNumber':
        setMobileNumber(value);
        break;
      case 'aadharNumber':
        setAadharNumber(value);
        break;
      case 'address':
        setAddress(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'confirm_password':
        setCPassword(value);
        break;
        
      default:
        break;
    }
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
  
    if (!customerName) errors.customerName = 'Customer Name is required';
    if (!email_id) errors.email_id = 'Email is required';
    if (!mobileNumber) errors.mobileNumber = 'Mobile Number is required';
    if (!aadharNumber) errors.aadharNumber = 'Aadhar Number is required';
    if (!address) errors.address = 'Address is required';
    if (!password) errors.password = 'Password is required';
    if (!confirm_password) errors.confirm_password = 'Confirm Password is required';
    if (password && confirm_password && password !== confirm_password) {
      errors.confirm_password = 'Passwords do not match';
    }
    setFormErrors(errors);
    if (Object.keys(errors).length !== 0) return;
  
    try {
      
  
      const data = {
        name: customerName,
        username: customerName,
        email: email_id,
        company_name: company_name,
        mobile_number: mobileNumber,
        aadhar_number: aadharNumber,
        address: address,
        password: password,
        customer_type:customer_type,
        created_by: customer_id, // Set the current logged-in user's ID
      };
  
      // Include the token in the request headers
      const headers = {
        Authorization: `Bearer ${token}`,
      };
  
      if (customer) {
        // Update customer
        await axios.put(`${API_BASE_URL}/customer/update/${customer.id}/`, data, { headers });
      } else {
        // Add new customer
        await axios.post(`${API_BASE_URL}/customer/add/`, data, { headers });
      }
  
      navigate('/users');
    } catch (error) {
      console.error('Error adding/updating customer:', error.message);
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
                  <Col lg={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => handleInputChange(e, 'password')}
                        isInvalid={!!formErrors.password}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.password}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        value={confirm_password}
                        onChange={(e) => handleInputChange(e, 'confirm_password')}
                        isInvalid={!!formErrors.confirm_password}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.confirm_password}
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
