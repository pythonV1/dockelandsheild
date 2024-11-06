import React, { useState, useEffect } from 'react';
import { Card, CardBody, Col, Container, Row, Alert } from 'react-bootstrap';
import CommonTable from '../components/CommonTable';
import AddButton from '../components/AddButton';
import PageTitle from '../components/PageTitle';
import PageHelmet from '../components/PageHelmet';
import { imgPath } from '../components/Constants';
import axios from 'axios'; // Import axios for making API requests
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import API_BASE_URL from '../config';
import withAuthRedirect from '../hoc/withAuthRedirect'; // Import the HOC
import ConfirmationModal from '../components/ConfirmationModal'; //
const ProjectGeolocation = () => {
  const [projectgeolocations, setprojectgeolocations] = useState([]); // State to store device data
  const [statusMessage, setStatusMessage] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false); // State for showing/hiding modal
  const [deleteIndex, setDeleteIndex] = useState(null); // State to store index of item to delete
  const navigate = useNavigate();
  useEffect(() => {
    // Function to fetch device data from the API
    const fetchprojectgeolocations= async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/projectgeolocation/`
        ); // Make GET request to the API
        console.log('hello::', response.data);
        setprojectgeolocations(response.data); // Update state with fetched device data
      } catch (error) {
        console.error('Error fetching device data:', error);
      }
    };

    fetchprojectgeolocations(); // Call the fetchDevices function when the component mounts
  }, []); // Empty dependency array ensures the effect runs only once after initial render

 
  const headers = [
    'project_name',
    'latitude',
    'longitude',
    'refference_name',
  ];
  const rows = [
    [
      '834984',
      'Site 1',
      'Ramanathapuram',
      'Mandapam[66]',
      'Ramanathapuram',
      '109',
      '2',
      '091234',
      'Hect 00 Ares 40.50',
      <a key={1} target="_blank" href={`${imgPath.SurveyOnePdf}`}>
        {' '}
        FMB 1
      </a>,
    ],
    [
      '347644',
      'Site 2',
      'Chengalpattu',
      'Sembakkam',
      'Tambaram',
      '110',
      '6',
      '012232',
      'Hect 03 Ares 40.50',
      'FMB 2',
    ],
    [
      '983476',
      'Site 3',
      'Chennai',
      'Perunkudi',
      'Tambaram',
      '123',
      '3',
      '780112',
      'Hect 05 Ares 40.50',
      'FMb 3',
    ],
  ];

  const handleEdit = async (rowIndex) => {
    // Check if devices and rowIndex are valid
    if (
      !projectgeolocations ||
      rowIndex < 0 ||
      rowIndex >= projectgeolocations.length
    ) {
      return;
    }

    // Retrieve the device data from the devices array
    const projectgeolocation = projectgeolocations[rowIndex];
    console.log(projectgeolocations);
    // Navigate to the AddDevice component with the device data
    navigate('/project-geolocation/add-projectgeolocation', {
      state: { projectgeolocation },
    });
  };
  const handleDelete = async (id) => {
    if (
      !projectgeolocations ||
      id < 0 ||
      id >= projectgeolocations.length
    ) {
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
        `${API_BASE_URL}/projectgeolocation/delete/${projectgeolocations[deleteIndex].id}/`
      );

      // Remove the deleted device from the devices state
      setprojectgeolocations((prevProjectGeolocations) => {
        // Filter out the deleted device from the devices array
        const updatedProjectGeolocations = prevProjectGeolocations.filter(
          (device, index) => index !== deleteIndex
        );
        console.log(
          'project Geolocation deleted successfully:',
          updatedProjectGeolocations
        );
        return updatedProjectGeolocations;
      });
      // Set status message
      setStatusMessage('project Geolocation deleted successfully');
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
            buttonText={'Add project geolocation'}
            path="/project-geolocation/add-projectgeolocation"
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
                rows={projectgeolocations.map((projectgeolocation) => [
                  projectgeolocation.project_name,
                  projectgeolocation.latitude,
                  projectgeolocation.longitude,
                  projectgeolocation.refference_name,
                 
                ])}
                onEdit={handleEdit}
                onDelete={handleDelete}
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

export default withAuthRedirect(ProjectGeolocation);
