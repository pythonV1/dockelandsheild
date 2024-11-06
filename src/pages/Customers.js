import React, { useState, useEffect } from 'react';
import { Card, CardBody, Col, Container, Row, Alert } from 'react-bootstrap';
import CommonTable from '../components/CommonTable';
import AddButton from '../components/AddButton';
import PageTitle from '../components/PageTitle';
import PageHelmet from '../components/PageHelmet';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config';
import withAuthRedirect from '../hoc/withAuthRedirect'; // Import the HOC
import ConfirmationModal from '../components/ConfirmationModal'; //
const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [statusMessage, setStatusMessage] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false); // State for showing/hiding modal
  const [deleteIndex, setDeleteIndex] = useState(null); // State to store index of item to delete
  const navigate = useNavigate();
  useEffect(() => {
    // Function to fetch customer data from the API
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/customers/`); // Make GET request to the API
        //console.log('hello', response.data);
        setCustomers(response.data); // Update state with fetched customer data
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };
    fetchCustomers(); // Call the fetchDevices function when the component mounts
  }, []);
  const handleEdit = async (rowIndex) => {
    // Check if customers and rowIndex are valid
    if (!customers || rowIndex < 0 || rowIndex >= customers.length) {
      return;
    }

    // Retrieve the customer data from the customers array
    const customer = customers[rowIndex];
    console.log(customer);
    // Navigate to the AddDevice component with the customer data
    navigate('/customers/add-customer', { state: { customer } });
  };
  const handleDelete = async (id) => {
    if (!customers || id < 0 || id >= customers.length) {
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
        `${API_BASE_URL}/customer/delete/${customers[deleteIndex].customer_id}/`
      );

      // Remove the deleted device from the devices state
      setCustomers((prevCustomers) => {
        // Filter out the deleted device from the devices array
        const updatedCustomers = prevCustomers.filter(
          (customer, index) => index !== id
        );

        return updatedCustomers;
      });
      // Set status message
      setStatusMessage('Customer deleted successfully');
    } catch (error) {
      console.error('Error deleting Customer:', error);
    } finally {
      // Reset state after deletion
      setShowConfirmationModal(false);
      setDeleteIndex(null);
    }
  };

  const headers = [
    'Customer ID',
    'Name',
    'Email',
    'Mobile Number',
    'Address',
    'Aadhar Number',
  ];
  const rows = [
    [
      '7809',
      'Ram',
      'ram123@gmailcom',
      '9876543210',
      '48, Periyar nagar, Chengalpattu',
      '980723146754',
    ],
    [
      '8234',
      'Selva',
      'selva@gmailcom',
      '7891209345',
      '2A, karupasamy street, Madurai',
      '980723146754',
    ],
    [
      '3982',
      'Karthick',
      'karthick123@gmailcom',
      '9876543210',
      '21/4, Mahalingam street, Ramanathapuram',
      '980723146754',
    ],
  ];

  return (
    <Container fluid className="section">
      <PageHelmet />
      <Row className="g-3">
        <Col
          lg={12}
          className="d-flex justify-content-between align-items-center"
        >
          <div>
            <PageTitle />
          </div>
          <AddButton
            buttonText={'Add Customer'}
            setStatusMessage={setStatusMessage}
            path="/customers/add-customer"
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
                rows={customers.map((customer) => [
                  customer.customer_id,
                  customer.name,
                  customer.email,
                  customer.mobile_number,
                  customer.address,
                  customer.aadhar_number,
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

export default withAuthRedirect(Customers);
