import React, { useState } from 'react';
// Import useHistory hook
//import { useHistory } from 'react-router-dom';
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRightToBracket,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { imgPath } from '../components/Constants';
import PageHelmet from '../components/PageHelmet';
import axios from 'axios'; // Import axios
import { Link, useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLoginSuccess = (data) => {
    // Store token in localStorage
    localStorage.setItem('customerName', data.customerName);
    localStorage.setItem('address', data.address);
    localStorage.setItem('customer_role', data.customer_role);
    localStorage.setItem('customer_type', data.customer_type);
    localStorage.setItem('company_name', data.company_name);
    localStorage.setItem('id', data.id);
    //localStorage.setItem('token', data.token);
    if(data.customer_role==='manager')
    { 
    
    localStorage.setItem('superId', data.created_by_id);
    }
    
    localStorage.setItem('token', data.token.access);
    // Redirect to Dashboard
    navigate('/dashboard');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${API_BASE_URL}/login/`, {
        username,
        password,
      });
      if (response && response.data) {
        // Handle successful login
        handleLoginSuccess(response.data);

        navigate('/dashboard');
      } else {
        setError('Unexpected response from server');
      }
    } catch (error) {
      setError(error.response?.data?.detail || 'Invalid Username Or Password');
    }
  };

  return (
    <div className="login-bg">
      <PageHelmet />
      <Container>
        <Row className="justify-content-center">
          <Col lg={6}>
            <Card className="login-card">
              <Card.Header>
                <div className="d-flex justify-content-between align-items-center">
                  <h4>Sign In</h4>
                  <div>
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>Sign Up</Tooltip>}
                    >
                      <Link to="/signup">
                        <FontAwesomeIcon icon={faUserPlus} />
                      </Link>
                    </OverlayTrigger>
                  </div>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="login-logo-box">
                  <img src={imgPath.logo} className="logo" alt="logo" />
                </div>
                <Form className="default-form" onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 text-center">
                    <Button type="submit" className="btn btn-main">
                      <FontAwesomeIcon
                        icon={faArrowRightToBracket}
                        className="me-2"
                      />
                      Sign In
                    </Button>
                  </Form.Group>
                  {error && <div className="text-danger">{error}</div>}
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
