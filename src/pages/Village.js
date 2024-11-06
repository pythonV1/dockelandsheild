// District.js

import React, { useState, useEffect } from 'react';
import { Card, CardBody, Col, Container, Row, Alert } from 'react-bootstrap';
import CommonTable from '../components/CommonTable';
import AddButton from '../components/AddButton';
import PageTitle from '../components/PageTitle';
import PageHelmet from '../components/PageHelmet';
import axios from 'axios'; // Import axios for making API requests
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config';
import withAuthRedirect from '../hoc/withAuthRedirect'; // Import the HOC
import ConfirmationModal from '../components/ConfirmationModal'; //
const Village = () => {
  const [villages, setVillages] = useState([]);
  const navigate = useNavigate();
  const [statusMessage, setStatusMessage] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false); // State for showing/hiding modal
  const [deleteIndex, setDeleteIndex] = useState(null); // State to store index of item to delete
  useEffect(() => {
    // Function to fetch device data from the API
    const fetchVillages = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/villages/`); // Make GET request to the API
        //console.log('hello', response.data);
        setVillages(response.data); // Update state with fetched device data
      } catch (error) {
        console.error('Error fetching device data:', error);
      }
    };

    fetchVillages(); // Call the fetchDevices function when the component mounts
  }, []); // Empty dependency array ensures the effect runs only once after initial render

  const headers = ['District', 'Taluk', 'Village'];
  const rows = [
    ['Ariyalur', 'Andimadam', 'Kuvugam'],
    ['Ariyalur', 'Ariyalur', 'Kelaiyur'],
    ['Ariyalur', 'Sendurai', 'Periyalurichi'],
    ['Chengalpattu', 'Tambaram', 'Sembakkam'],
    ['Chennai', 'Sholinganallor', 'Perunkudi'],
    ['Madurai', 'Melur', 'Kambur'],
    ['Theni', 'Periyakulam', 'Pudukotai'],
    ['Ramanathapuram', 'Ramanathapuram', 'Mandapam[66]'],
  ];
  console.log('fff');
  console.log(villages);

  const handleEdit = async (rowIndex) => {
    // Check if devices and rowIndex are valid
    if (!villages || rowIndex < 0 || rowIndex >= villages.length) {
      return;
    }

    // Retrieve the device data from the devices array
    const village = villages[rowIndex];
    // console.log(district);
    // Navigate to the AddDevice component with the device data
    navigate('/master/village/add-village', { state: { village } });
  };
  const handleDelete = async (id) => {
    if (!villages || id < 0 || id >= villages.length) {
      return;
    }
    // Set the index of the item to delete and show the confirmation modal
    setDeleteIndex(id);
    setShowConfirmationModal(true);
  };
  const confirmDelete = async () => {
    try {
      // Delete the device from the server
      await axios.delete(
        `${API_BASE_URL}/village/delete/${villages[deleteIndex].id}/`
      );

      // Remove the deleted device from the devices state
      setVillages((prevVillages) => {
        // Filter out the deleted device from the devices array
        const updatedVillages = prevVillages.filter(
          (village, index) => index !== deleteIndex
        );
        console.log('Device deleted successfully:', updatedVillages);
        return updatedVillages;
      });
      // Set status message
      setStatusMessage('Village deleted successfully');
    } catch (error) {
      console.error('Error deleting Village:', error);
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
            buttonText={'Add Village'}
            path="/master/village/add-village"
          />
        </Col>
        <Col lg={12}>
          <Card className="main-card">
            <CardBody>
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
                rows={villages}
                rows={villages.map((village) => [
                  village.district_name,
                  village.taluk_name,
                  village.name,
                ])}
                onEdit={handleEdit}
                onDelete={handleDelete}
                editLinkPath="/master/village/add-village"
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

export default withAuthRedirect(Village);
