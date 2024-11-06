import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Row,
} from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import PageHelmet from '../components/PageHelmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import API_BASE_URL from '../config';
import withAuthRedirect from '../hoc/withAuthRedirect'; // Import the HOC

const AddPropertyDevice = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { propertydevice } = location.state || {};
  const [propertyID, setPropertyID] = useState('');
  const [customerOptions, setCustomerOptions] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [customerID, setCustomerID] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [devices, setDevices] = useState([]);
  const [propertydeviceList, setPropertyDeviceList] = useState([
    { id: Date.now(), geolocation: '', device: 0 },
  ]);
  const [customerMobile, setcustomerMobile] = useState('');
  const [geoLocations, setGeoLocations] = useState([]);
  const [propertyregistrations, setpropertyregistrations] = useState([]); // State to store device data
  const [formErrors, setFormErrors] = useState({});
  useEffect(() => {
    const fetchPropertyRegistrations = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/propertyregistrations/`
        );
        setpropertyregistrations(response.data);
      } catch (error) {
        console.error('Error fetching districts:', error);
      }
    };
    fetchPropertyRegistrations();
  }, []);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/devices/`);
        setDevices(response.data);
      } catch (error) {
        console.error('Error fetching districts:', error);
      }
    };
    fetchDevices();
  }, []);

  // Function to fetch Geo Locations based on Property ID
  const fetchGeoLocations = async (propertyID) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/propertyregistrations/${propertyID}/geolocations`
      );
      setGeoLocations(response.data);
    } catch (error) {
      console.error('Error fetching Geo Locations:', error);
    }
  };
  useEffect(() => {
    // Fetch customer data
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/customers/`);
        const options = response.data.map((customer) => ({
          value: customer.customer_id,
          label: customer.name,
          mobile: customer.mobile_number,
        }));
        setCustomerOptions(options);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, []);
  useEffect(() => {
    if (propertydevice) {
      setCustomerID(propertydevice.customer_id);
      setCustomerName(propertydevice.customer_name);
      setPropertyID(propertydevice.property_id);
      fetchGeoLocations(propertydevice.property_id);
      setPropertyDeviceList(propertydevice.propertydevice_devices);
      //console.log('devicelist', propertydevice.propertydevice_devices);
      // console.log('propertydeviceList', propertydeviceList);
      // const [propertydeviceList, setPropertyDeviceList] = useState([
      //   { id: Date.now(), geolocation: '', device: 0 },
      // ]);
    }
  }, [propertydevice]);

  const handlecustomerInputChange = (inputValue) => {
    // Filter options based on inputValue
    const filteredOptions = customerOptions.filter(
      (option) =>
        option.label &&
        option.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredCustomers(filteredOptions);
  };

  const handleCustomerSelect = (selectedCustomer) => {
    setCustomerID(selectedCustomer.value);
    setCustomerName(selectedCustomer.label);
    setcustomerMobile(selectedCustomer.mobile);

    setFilteredCustomers([]); // or setFilteredCustomers(null)
    console.log(customerID);
    clearFormError('customerName');
    clearFormError('customerMobile');
    // Additional logic if needed
  };
  // Event handler for Property ID change
  const handlePropertyIDChange = (e) => {
    const selectedPropertyID = e.target.value;
    clearFormError('propertyID');
    setPropertyID(selectedPropertyID);
    fetchGeoLocations(selectedPropertyID); // Fetch Geo Locations for selected Property ID
  };
  const addProDevice = () => {
    // if (propertydeviceList.length === 0) {
    //   setPropertyDeviceList([
    //     { id: Date.now(), geoLocation: null, deviceId: null },
    //   ]);
    // } else {
    setPropertyDeviceList([
      ...propertydeviceList,
      { id: Date.now(), geolocation: '', device: '' },
    ]);
    // }
  };

  const handleGeoLocationChange = (index, value) => {
    const updatedPropertyDeviceList = [...propertydeviceList];
    updatedPropertyDeviceList[index].geolocation = value;
    setPropertyDeviceList(updatedPropertyDeviceList);
  };

  const handleDeviceIdChange = (index, value) => {
    const updatedPropertyDeviceList = [...propertydeviceList];
    updatedPropertyDeviceList[index].device = value;
    setPropertyDeviceList(updatedPropertyDeviceList);
  };
  const deleteDevice = (id) => {
    const updatedPropertyDeviceList = propertydeviceList.filter(
      (device) => device.id !== id
    );
    setPropertyDeviceList(updatedPropertyDeviceList);
  };
  const handleInputChange = (e, fieldName) => {
    // Update the state based on the field name

    // Clear the form error for the corresponding field
    clearFormError(fieldName);
  };

  const clearFormError = (fieldName) => {
    setFormErrors((prevErrors) => {
      return { ...prevErrors, [fieldName]: '' };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = {};
    if (!propertyID) {
      errors.propertyID = 'Property Name is required';
    }
    if (!customerID) {
      errors.customerName = 'Customer is required';
    }
    if (!propertydeviceList) {
      errors.propertydeviceList = 'PropertydeviceList is required';
    }

    // Validation for geoLocations
    propertydeviceList.forEach((propertydevice, index) => {
      if (!propertydevice.geolocation) {
        errors[`geolocation${index}`] = 'Invalid geolocation';
      }
      if (!propertydevice.device) {
        errors[`device${index}`] = 'Invalid device';
      }
    });

    setFormErrors(errors);

    // If there are errors, stop form submission
    if (Object.keys(errors).length !== 0) {
      return;
    }
    try {
      if (!propertyID || !propertyID) {
        throw new Error('Please fill in all required fields.');
      }
      if (propertydevice) {
        await axios.post(
          `${API_BASE_URL}/propertydevice/update/${propertydevice.id}/`,
          {
            property_id: propertyID,
            customer_id: customerID,
            propertydeviceList: propertydeviceList,
          }
        );
      } else {
        await axios.post(`${API_BASE_URL}/propertydevice/add/`, {
          property_id: propertyID,
          customer_id: customerID,
          propertydeviceList: propertydeviceList,
        });
        // setStatusMessage('Device added successfully');
      }
      navigate('/property-device');
    } catch (error) {
      console.error('Error adding/updating device:', error.message);
      // alert(error.message);
    }
  };

  return (
    <Container fluid className="section">
      <PageHelmet />
      <Row className="g-3 justify-content-center">
        <Col lg={12} className="mb-4">
          <PageTitle />
        </Col>
        <Col lg={10}>
          <Card className="main-card">
            <CardBody>
              <Form className="main-form" onSubmit={handleSubmit}>
                <Row className="g-2">
                  <Col lg={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Property ID</Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        value={propertyID}
                        onChange={handlePropertyIDChange} // Call handlePropertyIDChange on change
                        isInvalid={!!formErrors.propertyID}
                      >
                        <option value="">Select Property ID</option>

                        {propertyregistrations.map((propertyregistration) => (
                          <option
                            key={propertyregistration.id}
                            value={propertyregistration.id}
                          >
                            {propertyregistration.id}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {formErrors.propertyID}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Customer Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Customer Name"
                        value={customerName}
                        onChange={(e) => {
                          setCustomerID(e.target.value);
                          setCustomerName(e.target.value);
                          handlecustomerInputChange(e.target.value);
                        }}
                        isInvalid={!!formErrors.customerName}
                      />
                      {filteredCustomers.length > 0 && (
                        <ul className="list-unstyled suggestions">
                          {filteredCustomers.map((customer) => (
                            <li
                              key={customer.value}
                              onClick={() => {
                                handleCustomerSelect(customer);
                                setCustomerID(customer.value);
                                setCustomerName(customer.label); // Update the name
                              }}
                            >
                              {customer.label}
                            </li>
                          ))}
                        </ul>
                      )}
                      <Form.Control.Feedback type="invalid">
                        {formErrors.customerName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Customer Phone number</Form.Label>
                      <Form.Control
                        type="text"
                        value={customerMobile}
                        placeholder="Customer Phone number"
                        isInvalid={!!formErrors.customerMobile}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.customerMobile}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col lg={12}>
                    <Row>
                      <Col lg={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Geo Location</Form.Label>
                          <Form.Select
                            aria-label="Default select example"
                            value={propertydeviceList[0].geolocation}
                            onChange={(e) =>
                              handleGeoLocationChange(0, e.target.value)
                            }
                            isInvalid={!!formErrors[`geolocation${0}`]}
                          >
                            <option value="">Geo Location</option>
                            {/* Map over geoLocations */}
                            {geoLocations.map((location) => (
                              <option key={location.id} value={location.id}>
                                {location.latitude}, {location.longitude}
                              </option>
                            ))}
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">
                            {formErrors[`geolocation${0}`]}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col lg={6}>
                        <div className="d-flex align-items-center gap-3">
                          <Form.Group className="w-100 mb-3">
                            <Form.Label>Device ID</Form.Label>
                            <Form.Select
                              value={propertydeviceList[0].device}
                              aria-label="Default select example"
                              onChange={(e) =>
                                handleDeviceIdChange(0, e.target.value)
                              }
                              isInvalid={!!formErrors[`device${0}`]}
                            >
                              <option value="">Device ID</option>
                              {devices.map((device) => (
                                <option
                                  key={device.tab_id}
                                  value={device.tab_id}
                                >
                                  {device.device_id}
                                </option>
                              ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                              {formErrors[`device${0}`]}
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Button
                            className="btn-edit mt-3"
                            onClick={addProDevice}
                          >
                            <FontAwesomeIcon icon={faPlus} />
                          </Button>
                        </div>
                      </Col>
                      {propertydeviceList
                        .slice(1)
                        .map((propertydevice, index) => (
                          <React.Fragment key={propertydevice.id}>
                            <Col lg={6}>
                              <Form.Group className="mb-3">
                                <Form.Select
                                  aria-label="Default select example"
                                  value={propertydevice.geolocation}
                                  onChange={(e) =>
                                    handleGeoLocationChange(
                                      index + 1,
                                      e.target.value
                                    )
                                  }
                                  isInvalid={
                                    !!formErrors[`geolocation${index + 1}`]
                                  }
                                >
                                  <option>Geo Location</option>
                                  {geoLocations.map((location) => (
                                    <option
                                      key={location.id}
                                      value={location.id}
                                    >
                                      {location.latitude}, {location.longitude}
                                    </option>
                                  ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                  {formErrors[`geolocation${index + 1}`]}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                            <Col lg={6}>
                              <Form.Group className="d-flex align-items-center gap-3">
                                <Form.Select
                                  aria-label="Default select example"
                                  value={propertydevice.device}
                                  onChange={(e) =>
                                    handleDeviceIdChange(
                                      index + 1,
                                      e.target.value
                                    )
                                  }
                                  isInvalid={!!formErrors[`device${index + 1}`]}
                                >
                                  <option>Device ID</option>
                                  {devices.map((device) => (
                                    <option
                                      key={device.tab_id}
                                      value={device.tab_id}
                                    >
                                      {device.device_id}
                                    </option>
                                  ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                  {formErrors[`device${index + 1}`]}
                                </Form.Control.Feedback>

                                <Button
                                  className="btn-delete"
                                  onClick={() =>
                                    deleteDevice(propertydevice.id)
                                  }
                                >
                                  <FontAwesomeIcon icon={faTrash} />
                                </Button>
                              </Form.Group>
                            </Col>
                          </React.Fragment>
                        ))}
                    </Row>
                  </Col>
                  <Col lg={12} className="text-center">
                    <Button type="submit" className="btn-main me-2">
                      Submit
                    </Button>
                    <Button
                      as={Link}
                      to="/property-device"
                      className="btn-cancel"
                    >
                      Cancel
                    </Button>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default withAuthRedirect(AddPropertyDevice);
