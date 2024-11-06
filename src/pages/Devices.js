import React, { useState, useEffect } from 'react';
import { Card, CardBody, Col, Container, Row, Alert } from 'react-bootstrap';
import CommonTable from '../components/CommonTable';
import AddButton from '../components/AddButton';
import PageTitle from '../components/PageTitle';
import PageHelmet from '../components/PageHelmet';
import axios from 'axios'; // Import axios for making API requests
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import API_BASE_URL from '../config';
import withAuthRedirect from '../hoc/withAuthRedirect'; // Import the HOC
import ConfirmationModal from '../components/ConfirmationModal'; // Import ConfirmationModal

const Devices = () => {
  const [devices, setDevices] = useState([]); // State to store device data
  const [statusMessage, setStatusMessage] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false); // State for showing/hiding modal
  const [deleteIndex, setDeleteIndex] = useState(null); // State to store index of item to delete
  const customer_id = localStorage.getItem('id');
  const navigate = useNavigate();
  useEffect(() => {
    // Function to fetch device data from the API
    const fetchDevices = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/devices/customer/${customer_id}/`); // Make GET request to the API
        //console.log('hello', response.data);
        setDevices(response.data); // Update state with fetched device data
      } catch (error) {
        console.error('Error fetching device data:', error);
      }
    };

    fetchDevices(); // Call the fetchDevices function when the component mounts
  }, []); // Empty dependency array ensures the effect runs only once after initial render

  const headers = [
    'Device ID',
    'Device Type',
    'Battery Status',
    'Device Status',
  ];

  const handleEdit = async (rowIndex) => {
    // Check if devices and rowIndex are valid
    if (!devices || rowIndex < 0 || rowIndex >= devices.length) {
      return;
    }

    // Retrieve the device data from the devices array
    const device = devices[rowIndex];
    console.log(device);
    // Navigate to the AddDevice component with the device data
    navigate('/master/devices/add-device', { state: { device } });
  };
  const handleDelete = async (id) => {
    if (!devices || id < 0 || id >= devices.length) {
      return;
    }
    // Set the index of the item to delete and show the confirmation modal
    setDeleteIndex(id);
    setShowConfirmationModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `${API_BASE_URL}/device/delete/${devices[deleteIndex].tab_id}/`
      );

      setDevices((prevDevices) => {
        const updatedDevices = prevDevices.filter(
          (device, index) => index !== deleteIndex
        );
        return updatedDevices;
      });

      setStatusMessage('Device deleted successfully');
    } catch (error) {
      console.error('Error deleting device:', error);
    } finally {
      // Reset state after deletion
      setShowConfirmationModal(false);
      setDeleteIndex(null);
    }
  };

  return (
    <Container fluid className="section">
      <PageHelmet />
      <Row className="g-3">
        <Col
          lg={12}
          className="d-flex justify-content-between align-items-center"
        >
          <PageTitle />
          <AddButton
            setStatusMessage={setStatusMessage}
            buttonText={'Add Devices'}
            path="/master/devices/add-device"
          />
        </Col>
        <Col lg={12}>
          <Card className="main-card">
            <CardBody>
              {/* Display status message */}
              {statusMessage && (
                <Alert
                  variant={
                    statusMessage.includes('Error') ? 'danger' : 'success'
                  }
                >
                  {statusMessage}
                </Alert>
              )}
              <CommonTable
                headers={headers}
                rows={devices.map((device) => [
                  device.device_id,
                  device.device_type,
                  device.battery_status ? `${device.battery_status}%` : '--',
                  device.device_status ? 'Active' : 'Inactive', // Convert boolean to string
                ])}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />

              {/* <CommonTable headers={headers}  rows={devices.map((device) => [
                  device.device_id,

                  device.device_type,
                  `${device.battery_status}%`,
                  device.device_status,
                ])}  onEdit={handleEdit} onDelete={handleDelete} editLinkPath="/master/devices/add-device" /> */}
            </CardBody>
          </Card>
        </Col>
      </Row>
      {/* Confirmation modal */}
      <ConfirmationModal
        show={showConfirmationModal}
        onHide={() => setShowConfirmationModal(false)}
        onConfirm={confirmDelete}
      />
    </Container>
  );
};

export default withAuthRedirect(Devices); // Wrap the component with the HOC
