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
const Taluk = () => {
  const [taluks, setTaluks] = useState([]);

  const navigate = useNavigate();
  const [statusMessage, setStatusMessage] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false); // State for showing/hiding modal
  const [deleteIndex, setDeleteIndex] = useState(null); // State to store index of item to delete
  useEffect(() => {
    // Function to fetch device data from the API
    const fetchTaluks = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/taluks/`); // Make GET request to the API
        //console.log('hello', response.data);
        setTaluks(response.data); // Update state with fetched device data
      } catch (error) {
        console.error('Error fetching device data:', error);
      }
    };

    fetchTaluks(); // Call the fetchDevices function when the component mounts
  }, []); // Empty dependency array ensures the effect runs only once after initial render

  const headers = ['District', 'Taluk'];
  const rows = [
    ['Ariyalur', 'Andimadam'],
    ['Ariyalur', 'Ariyalur'],
    ['Ariyalur', 'Sendurai'],
    ['Chengalpattu', 'Tambaram'],
    ['Chennai', 'Sholinganallor'],
    ['Madurai', 'Melur'],
    ['Theni', 'Periyakulam'],
    ['Ramanathapuram', 'Ramanathapuram'],
  ];
  // console.log('ffffffff');
  // console.log(taluks);
  const handleEdit = async (rowIndex) => {
    // Check if devices and rowIndex are valid
    if (!taluks || rowIndex < 0 || rowIndex >= taluks.length) {
      return;
    }

    // Retrieve the device data from the devices array
    const taluk = taluks[rowIndex];
    // console.log(district);
    // Navigate to the AddDevice component with the device data
    navigate('/master/taluk/add-taluk', { state: { taluk } });
  };
  const handleDelete = async (id) => {
    if (!taluks || id < 0 || id >= taluks.length) {
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
        `${API_BASE_URL}/taluk/delete/${taluks[deleteIndex].id}/`
      );

      // Remove the deleted device from the devices state
      setTaluks((prevTaluks) => {
        // Filter out the deleted device from the devices array
        const updatedTaluks = prevTaluks.filter(
          (taluk, index) => index !== deleteIndex
        );
        console.log('Device deleted successfully:', updatedTaluks);
        return updatedTaluks;
      });
      // Set status message
      setStatusMessage('Taluk deleted successfully');
    } catch (error) {
      console.error('Error deleting Taluk:', error);
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
          <AddButton buttonText={'Add Taluk'} path="/master/taluk/add-taluk" />
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
                rows={taluks.map((taluk) => [taluk.district_name, taluk.name])}
                onEdit={handleEdit}
                onDelete={handleDelete}
                editLinkPath="/master/taluk/add-taluk"
              />
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

export default withAuthRedirect(Taluk);
