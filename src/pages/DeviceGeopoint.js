import React, { useState, useEffect } from 'react';
import { Card, CardBody, Col, Container, Row, Alert } from 'react-bootstrap';
import CommonTable from '../components/CommonTable';
import AddButton from '../components/AddButton';
import PageTitle from '../components/PageTitle';
import PageHelmet from '../components/PageHelmet';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
import API_BASE_URL from '../config';
import withAuthRedirect from '../hoc/withAuthRedirect';
import ConfirmationModal from '../components/ConfirmationModal';

const DeviceGeoPointPage = () => {
  const [deviceGeoPoints, setDeviceGeoPoints] = useState([]);
  const [statusMessage, setStatusMessage] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const navigate = useNavigate();
  
  const customer_id = localStorage.getItem('id');
  
  
  useEffect(() => {
    const fetchDeviceGeoPoints = async () => {
      try {
        
        const response = await axios.get(`${API_BASE_URL}/geolocations/customer/${customer_id}/`);
        console.log('Device Geolocation Response:', response.data); // Add this l 
        setDeviceGeoPoints(response.data);
      } catch (error) {
        console.error('Error fetching device geolocation data:', error);
      }
    };
  
    fetchDeviceGeoPoints();
  }, []);

  const headers = [
    'Project Name',
    'Device ID',
    'Latitude',
    'Longitude',
    'Device Movement',
    'Last Updated'
  ];

  const rows = deviceGeoPoints.map((deviceGeoPoint) => [
    
    <Link key={deviceGeoPoint.project_id} to={`/project/survey-details/${deviceGeoPoint.project_id}`}
    >{deviceGeoPoint.project_name}</Link>,
    deviceGeoPoint.device_id,
    deviceGeoPoint.latitude,
    deviceGeoPoint.longitude,
    deviceGeoPoint.device_movement,
    deviceGeoPoint.last_updated,
  ]);

  const handleEdit = (rowIndex) => {
    if (
      !deviceGeoPoints ||
      rowIndex < 0 ||
      rowIndex >= deviceGeoPoints.length
    ) {
      return;
    }
    const deviceGeoPoint = deviceGeoPoints[rowIndex];
    navigate('/device-geopoint/add-devicegeopoint', {
      state: { deviceGeoPoint },
    });
  };

  const handleDelete = async (id) => {
    if (!deviceGeoPoints || id < 0 || id >= deviceGeoPoints.length) {
      return;
    }
    setDeleteIndex(id);
    setShowConfirmationModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `${API_BASE_URL}/devicegeopoint/delete/${deviceGeoPoints[deleteIndex].id}/`
      );

      setDeviceGeoPoints((prevDeviceGeoPoints) => {
        const updatedDeviceGeoPoints = prevDeviceGeoPoints.filter(
          (point, index) => index !== deleteIndex
        );
        return updatedDeviceGeoPoints;
      });

      setStatusMessage('Device geolocation deleted successfully');
    } catch (error) {
      console.error('Error deleting device geolocation:', error);
    } finally {
      setShowConfirmationModal(false);
      setDeleteIndex(null);
    }
  };

  return (
    <Container fluid className="section">
      <PageHelmet />
      <Row className="g-3">
        <Col lg={12} className="d-flex justify-content-between align-items-center">
          <PageTitle title="Device Geolocation Points" />
          <AddButton buttonText={'Add Device Geolocation'} path="/device-geopoint/add-devicegeopoint" />
        </Col>
        <Col lg={12}>
          <Card className="main-card">
            <CardBody>
              {statusMessage && (
                <Alert variant={statusMessage.includes('Error') ? 'danger' : 'success'}>
                  {statusMessage}
                </Alert>
              )} 
              <CommonTable
                headers={headers}
                rows={rows}
                onEdit={handleEdit}
                onDelete={false}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      <ConfirmationModal
        show={showConfirmationModal}
        onHide={() => setShowConfirmationModal(false)}
        onConfirm={confirmDelete}
      />
    </Container>
  );
};

export default withAuthRedirect(DeviceGeoPointPage);
