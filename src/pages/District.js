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
const District = () => {
  const [districts, setDistricts] = useState([]);
  const [statusMessage, setStatusMessage] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false); // State for showing/hiding modal
  const [deleteIndex, setDeleteIndex] = useState(null); // State to store index of item to delete
  const headers = ['District'];
  const navigate = useNavigate();
  useEffect(() => {
    fetchDistricts();
  }, []);

  const fetchDistricts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/districts/`);
      setDistricts(response.data);
    } catch (error) {
      console.error('Error fetching districts:', error);
    }
  };
  const handleEdit = async (rowIndex) => {
    // Check if devices and rowIndex are valid
    if (!districts || rowIndex < 0 || rowIndex >= districts.length) {
      return;
    }

    // Retrieve the device data from the devices array
    const district = districts[rowIndex];
    // console.log(district);
    // Navigate to the AddDevice component with the device data
    navigate('/master/district/add-district', { state: { district } });
  };
  // const handleEdit = (rowIndex) => {
  //   // Implement the edit action based on the rowIndex
  //   console.log(`Editing row at index ${rowIndex}`);
  // };
  const handleDelete = async (id) => {
    if (!districts || id < 0 || id >= districts.length) {
      return;
    }
    // Set the index of the item to delete and show the confirmation modal
    setDeleteIndex(id);
    setShowConfirmationModal(true);
  };
  const confirmDelete = async () => {
    try {
      await axios.delete(
        `${API_BASE_URL}/district/delete/${districts[deleteIndex].id}/`
      );
      setDistricts((prevDistricts) => {
        // Filter out the deleted device from the devices array
        const updatedDistricts = prevDistricts.filter(
          (device, index) => index !== deleteIndex
        );
        console.log('Device deleted successfully:', updatedDistricts);
        return updatedDistricts;
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

  // const handleDelete = async (id) => {
  //   try {
  //     // Delete the device from the server
  //     await axios.delete(
  //       `${API_BASE_URL}/district/delete/${districts[id].id}/`
  //     );

  //     // Remove the deleted device from the devices state
  //     setDistricts((prevDistricts) => {
  //       // Filter out the deleted device from the devices array
  //       const updatedDistricts = prevDistricts.filter(
  //         (device, index) => index !== id
  //       );
  //       console.log('Device deleted successfully:', updatedDistricts);
  //       return updatedDistricts;
  //     });
  //     // Set status message
  //     setStatusMessage('Device deleted successfully');
  //   } catch (error) {
  //     console.error('Error deleting device:', error);
  //   }
  // };
  // const handleDelete = (rowIndex) => {
  //   // Implement the delete action based on the rowIndex
  //   console.log(`Deleting row at index ${rowIndex}`);
  // };

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
            buttonText={'Add District'}
            path="/master/district/add-district"
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
                rows={districts.map((district) => [district.name])}
                onEdit={handleEdit}
                onDelete={handleDelete}
                editLinkPath="/master/district/add-district"
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

export default withAuthRedirect(District);
