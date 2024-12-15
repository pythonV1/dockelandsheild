import React, { useEffect, useState } from 'react';
import { faDesktop, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, CardBody, Col, Container, Row } from 'react-bootstrap';
import API_BASE_URL from '../config';
import PageTitle from '../components/PageTitle';
import PageHelmet from '../components/PageHelmet';
import { TbDevicesPc, TbDevicesPcOff } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import PieChart from '../components/PieChart';
import BarChart from '../components/BarChart';
import axios from 'axios';
import withAuthRedirect from '../hoc/withAuthRedirect'; // Import the HOC
const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate hook
  const customer_id = localStorage.getItem('id');
  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      // If not authenticated, redirect to login page
      navigate('/login');
    } else {
      async function fetchData() {
        try {
          const response = await axios.get(`${API_BASE_URL}/dashboard/customer/${customer_id}/`);

          console.log('ffff:::', response.data);
          setDashboardData(response.data);
        } catch (error) {
          console.error('Error fetching dashboard data:', error);
        }
      }

      fetchData();
    }
  }, [navigate]); // Add navigate to dependency array

  return (
    <Container fluid className="section">
      <PageHelmet />
      <Row className="g-3 mb-5">
        <Col lg={12}>
          <PageTitle />
        </Col>
        {/*<Col md={6} lg={4} xl={3}>
          <div className="counter">
            <div className="counter-content">
              <div className="counter-icon">
                <FontAwesomeIcon icon={faUsers} />
              </div>
              <h3>Total Customers</h3>
            </div>
            <span className="counter-value">
              {dashboardData && dashboardData.total_customers}
            </span>
          </div>
        </Col> */}
        <Col md={6} lg={4} xl={3}>
          <div className="counter counter-one">
            <div className="counter-content">
              <div className="counter-icon">
                <FontAwesomeIcon icon={faDesktop} />
              </div>
              <h3>Total Devices</h3>
            </div>
            <span className="counter-value">
              {dashboardData && dashboardData.total_devices}
            </span>
          </div>
        </Col>
        <Col md={6} lg={4} xl={3}>
          <div className="counter counter-two">
            <div className="counter-content">
              <div className="counter-icon">
                <TbDevicesPc />
              </div>
              <h3>Active Devices</h3>
            </div>
            <span className="counter-value">
              {dashboardData && dashboardData.active_devices}
            </span>
          </div>
        </Col>
        <Col md={6} lg={4} xl={3}>
          <div className="counter counter-three">
            <div className="counter-content">
              <div className="counter-icon">
                <TbDevicesPcOff />
              </div>
              <h3>Inactive Devices</h3>
            </div>
            <span className="counter-value">
              {dashboardData && dashboardData.inactive_devices}
            </span>
          </div>
        </Col>
      </Row>
       {/*
      <Row className="g-3">
        <Col xl={6}>
          <Card className="main-card">
            <CardBody>
              <PieChart />
            </CardBody>
          </Card>
        </Col>
        <Col xl={6}>
          <Card className="main-card">
            <CardBody>
              <BarChart />
            </CardBody>
          </Card>
        </Col>
      </Row> */}
    </Container>
  );
};

export default withAuthRedirect(Dashboard);
