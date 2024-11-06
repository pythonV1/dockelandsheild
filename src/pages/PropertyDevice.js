import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col, Container, Row, Alert } from 'react-bootstrap';
import CommonTable from '../components/CommonTable';
import AddButton from '../components/AddButton';
import PageTitle from '../components/PageTitle';
import PageHelmet from '../components/PageHelmet';
import axios from 'axios'; // Import axios for making API requests
import { Link, useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config';
import withAuthRedirect from '../hoc/withAuthRedirect'; // Import the HOC
import ConfirmationModal from '../components/ConfirmationModal'; //
const PropertyDevice = () => {
  const [propertydevices, setpropertydevicelist] = useState([]);
  const [statusMessage, setStatusMessage] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false); // State for showing/hiding modal
  const [deleteIndex, setDeleteIndex] = useState(null); // State to store index of item to delete
  const navigate = useNavigate();

  useEffect(() => {
    // Function to fetch device data from the API
    const fetchpropertydevice = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/propertydevices/`); // Make GET request to the API
        console.log('hello1234568::', response.data);
        setpropertydevicelist(response.data); // Update state with fetched device data
      } catch (error) {
        console.error('Error fetching device data:', error);
      }
    };

    fetchpropertydevice(); // Call the fetchDevices function when the component mounts
  }, []); // Empty dependency array ensures the effect runs only once after initial render

  const headers = [
    'Property ID',
    'Property Name',
    'Customer Name',
    'District',
    'Village',
    'Taluk',
    'Device Count',
    ' G Force',
    'Last Updated',
    'Survey Number',
  ];
  const rows = [
    [
      '834984',
      'Site 1',
      'Karthick',
      'Ramanathapuram',
      'Mandapam[66]',
      'Ramanathapuram',
      '6',
      '1',
      '02-01-2021 12:23 P.M',
      <Link key={1} to="/property-device/survey-details">
        109/2A
      </Link>,
    ],
    [
      '347644',
      'Site 2',
      'Ram',
      'Chengalpattu',
      'Sembakkam',
      'Tambaram',
      '6',
      '0.5',
      '20-03-2022 10:00 A.M',
      <Link key={2} to="/property-device/survey-details2">
        110/3B
      </Link>,
    ],
    [
      '347644',
      'Site 3',
      'Selva',
      'Ariyalur',
      'Kuvugam',
      'Andimadam',
      '5',
      '2',
      '20-04-2022 02:00 P.M',
      <Link key={3} to="/property-device/survey-details2">
        115/1C
      </Link>,
    ],
  ];

  const handleEdit = async (rowIndex) => {
    // Check if devices and rowIndex are valid
    if (
      !propertydevices ||
      rowIndex < 0 ||
      rowIndex >= propertydevices.length
    ) {
      return;
    }

    // Retrieve the device data from the devices array
    const propertydevice = propertydevices[rowIndex];
    // console.log(propertydevice);
    console.log(propertydevices);
    // Navigate to the AddDevice component with the device data
    navigate('/property-device/add-property-device', {
      state: { propertydevice },
    });
  };
  const handleDelete = async (id) => {
    if (!propertydevices || id < 0 || id >= propertydevices.length) {
      return;
    }
    // Set the index of the item to delete and show the confirmation modal
    setDeleteIndex(id);
    setShowConfirmationModal(true);
  };
  const confirmDelete = async (id) => {
    try {
      // Delete the device from the server
      await axios.delete(
        `${API_BASE_URL}/propertydevice/delete/${propertydevices[deleteIndex].id}/`
      );

      // Remove the deleted device from the devices state
      setpropertydevicelist((prevPropertyDevices) => {
        // Filter out the deleted device from the devices array
        const updatedPropertyDevices = prevPropertyDevices.filter(
          (propertydevice, index) => index !== id
        );
        console.log(
          'Property Device deleted successfully:',
          updatedPropertyDevices
        );
        return updatedPropertyDevices;
      });
      // Set status message
      setStatusMessage('Property Device deleted successfully');
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
            buttonText={'Add Property Device'}
            path="/property-device/add-property-device"
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
                rows={propertydevices.map((propertydevice) => [
                  propertydevice.property_id,
                  propertydevice.property_name,
                  propertydevice.customer_name,
                  propertydevice.district_name,
                  propertydevice.village_name,
                  propertydevice.taluk_name,
                  propertydevice.device_count,
                  propertydevice.taluk_name,
                  propertydevice.last_updated,
                  <Link
                    key={propertydevice.id}
                    to={`/property-device/survey-details/${propertydevice.id}`}
                  >
                    {propertydevice.survey_number}
                  </Link>,
                ])}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
              {/* <CommonTable
                headers={headers}
                rows={rows}
                onEdit={handleEdit}
                onDelete={handleDelete}
                editLinkPath="/property-device/add-property-device"
              /> */}
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

export default withAuthRedirect(PropertyDevice);
