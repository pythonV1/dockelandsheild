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
//axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';
// Log all request interceptors
axios.defaults.xsrfHeaderName = 'X-CSRFToken'; // Set the X-CSRFToken header name
axios.defaults.xsrfCookieName = 'csrftoken'; // Set the CSRF token cookie name

axios.interceptors.request.use((request) => {
  console.log('Request interceptor:', request);
  return request;
});

// Log all response interceptors
axios.interceptors.response.use((response) => {
  console.log('Response interceptor:', response);
  return response;
});
axios.interceptors.request.eject(axios.interceptors.request.use(() => {}));

const AddPropertyRegistration = () => {
  const [geoLocations, setGeoLocations] = useState([
    { id: Date.now(), latitude: null, longitude: null },
  ]);
  // const [geoLocations, setGeoLocations] = useState([
  //   { id: Date.now(), latitude: '', longitude: '' },
  // ]);
  const [PropertyRegistrationID, setPropertyRegistrationID] = useState('');
  const [propertyName, setPropertyName] = useState('');
  const [taluktID, setTalukID] = useState('');
  const [taluks, setTaluks] = useState([]);
  const [districtID, setDistrictID] = useState('');
  const [districts, setDistricts] = useState([]);
  const [villageID, setVillageID] = useState('');
  const [villages, setVillages] = useState([]);
  const [surveyNumber, setSurveyNumber] = useState('');
  const [surveySubDivision, setSurveySubDivision] = useState('');
  const [area, setArea] = useState('');
  // const [fmb, setFmb] = useState('');
  const [fmbFile, setFmbFile] = useState(null);
  const [pattaNumber, setPattaNumber] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { propertyregistration } = location.state || {};

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/districts/`);
        setDistricts(response.data);
      } catch (error) {
        console.error('Error fetching districts:', error);
      }
    };
    fetchDistricts();
  }, []);
  useEffect(() => {
    if (propertyregistration) {
      setPropertyRegistrationID(propertyregistration.id);
      setPropertyName(propertyregistration.property_name);
      setSurveyNumber(propertyregistration.survey_number);
      setDistrictID(propertyregistration.district);
      fetchTaluks(propertyregistration.district);
      setTalukID(propertyregistration.taluk);
      fetchVillages(propertyregistration.taluk);
      setVillageID(propertyregistration.village);
      setSurveySubDivision(propertyregistration.survey_sub_division);
      setPattaNumber(propertyregistration.patta_number);
      setArea(propertyregistration.area);
      if (propertyregistration.geolocations.length > 0) {
        setGeoLocations(propertyregistration.geolocations);
      }

      setFmbFile(propertyregistration.fmb);
    }
  }, [propertyregistration]);

  const addGeoLocation = () => {
    setGeoLocations((prevLocations) => [
      ...prevLocations,
      { id: Date.now(), latitude: null, longitude: null },
    ]);
  };

  const handleLatitudeChange = (index, value) => {
    setGeoLocations((prevLocations) => {
      const updatedLocations = [...prevLocations];
      updatedLocations[index] = {
        ...updatedLocations[index],
        latitude: value,
      };
      return updatedLocations;
    });
  };

  const handleLongitudeChange = (index, value) => {
    setGeoLocations((prevLocations) => {
      const updatedLocations = [...prevLocations];
      updatedLocations[index] = {
        ...updatedLocations[index],
        longitude: value,
      };
      return updatedLocations;
    });
  };

  const deleteGeoLocation = (id) => {
    setGeoLocations((prevLocations) =>
      prevLocations.filter((location) => location.id !== id)
    );
  };

  const handleFileChange = (e) => {
    setFmbFile(e.target.files[0]);
    console.log('fmbFile22sss:', e.target.files[0]);
    console.log('fmbFile3333sss:', fmbFile);
  };
  const fetchTaluks = (districtID) => {
    setTalukID('');
    setVillageID('');
    // Make an API request to fetch taluks based on the district ID
    axios
      .get(`${API_BASE_URL}/taluks/${districtID}/`)
      .then((response) => {
        // Handle the response data and update the taluks state accordingly
        setTaluks(response.data);
      })
      .catch((error) => {
        console.error('Error fetching taluks:', error);
      });
  };
  const fetchVillages = (taluksID) => {
    // Make an API request to fetch taluks based on the district ID
    axios
      .get(`${API_BASE_URL}/villages/${taluksID}/`)
      .then((response) => {
        // Handle the response data and update the taluks state accordingly
        setVillages(response.data);
      })
      .catch((error) => {
        console.error('Error fetching taluks:', error);
      });
  };

  const handleChange = (e, fieldName) => {
    // Update the state based on the field name
    switch (fieldName) {
      case 'propertyName':
        setPropertyName(e.target.value);
        break;
      case 'surveyNumber':
        setSurveyNumber(e.target.value);
        break;
      case 'surveySubDivision':
        setSurveySubDivision(e.target.value);
        break;
      case 'pattaNumber':
        setPattaNumber(e.target.value);
        break;
      case 'area':
        setArea(e.target.value);
        break;
      case 'villageID':
        setVillageID(e.target.value);
        break;

      // Add cases for other fields if needed
      default:
        break;
    }
    // Clear the form error for the corresponding field
    clearFormError(fieldName);
  };

  const clearFormError = (fieldName) => {
    setFormErrors((prevErrors) => {
      return { ...prevErrors, [fieldName]: '' };
    });
  };
  // Validation functions for latitude and longitude
  const isValidLatitude = (latitude) => {
    return !isNaN(latitude) && latitude >= -90 && latitude <= 90;
  };

  const isValidLongitude = (longitude) => {
    return !isNaN(longitude) && longitude >= -180 && longitude <= 180;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = {};
    if (!propertyName) {
      errors.propertyName = 'Property Name is required';
    }
    if (!surveyNumber) {
      errors.surveyNumber = 'Survey Number is required';
    }
    if (!surveySubDivision) {
      errors.surveySubDivision = 'Survey Sub Division is required';
    }
    if (!pattaNumber) {
      errors.pattaNumber = 'Patta Number is required';
    }
    if (!area) {
      errors.area = 'Area is required';
    }
    if (!districtID) {
      errors.districtID = 'District is required';
    }

    if (!villageID) {
      errors.villageID = 'Village is required';
    }
    if (!taluktID) {
      errors.taluktID = 'Taluk is required';
    }
    // Validation for geoLocations
    geoLocations.forEach((location, index) => {
      if (!location.latitude || !isValidLatitude(location.latitude)) {
        errors[`latitude${index}`] = 'Invalid latitude';
      }
      if (!location.longitude || !isValidLongitude(location.longitude)) {
        errors[`longitude${index}`] = 'Invalid longitude';
      }
    });
    // Set the form errors
    setFormErrors(errors);
    try {
      const formData = new FormData();
      formData.append('property_name', propertyName);
      formData.append('district', districtID);
      formData.append('village', villageID);
      formData.append('taluk', taluktID);
      formData.append('survey_number', surveyNumber);
      formData.append('survey_sub_division', surveySubDivision);
      formData.append('patta_number', pattaNumber);
      formData.append('area', area);
      formData.append('fmb', fmbFile);
      // formData.append('geolocations', JSON.stringify(geoLocations));
      geoLocations.forEach((location) => {
        formData.append('geolocations', JSON.stringify(location));
      });
      //formData.append('geolocations', JSON.stringify(geoLocations));

      if (propertyregistration) {
        await axios.put(
          `${API_BASE_URL}/propertyregistration/update/${propertyregistration.id}/`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
      } else {
        await axios.post(`${API_BASE_URL}/propertyregistration/add/`, formData);
      }
      navigate('/property-registration');
    } catch (error) {
      console.error(
        'Error adding/updating property-registration:',
        error.message
      );
      // Display error message to user
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
              <Form
                className="main-form"
                onSubmit={handleSubmit}
                enctype="multipart/form-data"
              >
                <Row className="g-2">
                  <Col lg={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Property Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Property Name"
                        value={propertyName}
                        onChange={(e) => handleChange(e, 'propertyName')}
                        isInvalid={!!formErrors.propertyName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.propertyName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    <Form.Label>District</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      value={districtID}
                      onChange={(e) => {
                        setDistrictID(e.target.value);
                        fetchTaluks(e.target.value);
                      }}
                      isInvalid={!!formErrors.districtID}
                    >
                      <option value="">Select District</option>
                      {districts.map((district) => (
                        <option key={district.id} value={district.id}>
                          {district.name}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {formErrors.districtID}
                    </Form.Control.Feedback>
                  </Col>
                  <Col lg={6}>
                    <Form.Label>Taluk</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      value={taluktID}
                      onChange={(e) => {
                        setTalukID(e.target.value);
                        fetchVillages(e.target.value);
                      }}
                      isInvalid={!!formErrors.taluktID}
                    >
                      <option value="">Select Taluk</option>
                      {taluks.map((taluk) => (
                        <option key={taluk.id} value={taluk.id}>
                          {taluk.name}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {formErrors.taluktID}
                    </Form.Control.Feedback>
                  </Col>
                  <Col lg={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Village</Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        value={villageID}
                        onChange={(e) => handleChange(e, 'villageID')}
                        //onChange={(e) => setVillageID(e.target.value)}
                        isInvalid={!!formErrors.villageID}
                      >
                        <option value="">Select Village</option>
                        {villages.map((village) => (
                          <option key={village.id} value={village.id}>
                            {village.name}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {formErrors.villageID}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Survey Number</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Survey Number"
                        value={surveyNumber}
                        onChange={(e) => handleChange(e, 'surveyNumber')}
                        isInvalid={!!formErrors.surveyNumber}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.surveyNumber}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Survey Sub Division</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Survey Sub Division"
                        value={surveySubDivision}
                        onChange={(e) => handleChange(e, 'surveySubDivision')}
                        isInvalid={!!formErrors.surveySubDivision}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.surveySubDivision}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Patta</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Patta"
                        value={pattaNumber}
                        onChange={(e) => handleChange(e, 'pattaNumber')}
                        isInvalid={!!formErrors.pattaNumber}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.pattaNumber}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Area</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Area"
                        value={area}
                        onChange={(e) => handleChange(e, 'area')}
                        isInvalid={!!formErrors.area}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.area}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col lg={12}>
                    <Row>
                      <Col lg={12}>
                        <Row>
                          <Col lg={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Geo Location</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Latitude"
                                value={
                                  geoLocations.length > 0 && geoLocations[0]
                                    ? geoLocations[0].latitude
                                    : ''
                                }
                                onChange={(e) =>
                                  handleLatitudeChange(0, e.target.value)
                                }
                                isInvalid={!!formErrors[`latitude${0}`]}
                              />
                              <Form.Control.Feedback type="invalid">
                                {formErrors[`latitude${0}`]}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                          <Col lg={6} className="align-self-end">
                            <Form.Group className="d-flex align-items-center gap-3 mb-3">
                              <Form.Control
                                type="text"
                                placeholder="Longitude"
                                value={
                                  geoLocations.length > 0 && geoLocations[0]
                                    ? geoLocations[0].longitude
                                    : ''
                                }
                                onChange={(e) =>
                                  handleLongitudeChange(0, e.target.value)
                                }
                                isInvalid={!!formErrors[`longitude${0}`]}
                              />
                              <Form.Control.Feedback type="invalid">
                                {formErrors[`longitude${0}`]}
                              </Form.Control.Feedback>

                              <Button
                                className="btn-edit"
                                onClick={addGeoLocation}
                              >
                                <FontAwesomeIcon icon={faPlus} />
                              </Button>
                            </Form.Group>
                          </Col>
                        </Row>
                      </Col>
                      {/* 
                      <React.Fragment key={location.id}>
                        <Col lg={6}>
                          <Form.Group className="mb-3">
                            <Form.Control
                              type="text"
                              placeholder="Latitude"
                              value={location.latitude}
                              onChange={(e) =>
                                handleLatitudeChange(1, e.target.value)
                              }
                            />
                          </Form.Group>
                        </Col>
                        <Col lg={6} className="align-self-end">
                          <Form.Group className="d-flex align-items-center gap-3 mb-3">
                            <Form.Control
                              type="text"
                              placeholder="Longitude"
                              value={location.longitude}
                              onChange={(e) =>
                                handleLongitudeChange(1, e.target.value)
                              }
                            />
                            <Button
                              className="btn-delete"
                              onClick={() => deleteGeoLocation(location.id)}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </Button>
                          </Form.Group>
                        </Col>
                      </React.Fragment>*/}
                      {geoLocations.slice(1).map((location, index) => (
                        <React.Fragment key={location.id}>
                          <Col lg={6}>
                            <Form.Group className="mb-3">
                              <Form.Control
                                type="text"
                                placeholder="Latitude"
                                value={location.latitude}
                                onChange={(e) =>
                                  handleLatitudeChange(
                                    index + 1,
                                    e.target.value
                                  )
                                }
                                isInvalid={!!formErrors[`latitude${index + 1}`]}
                              />
                              <Form.Control.Feedback type="invalid">
                                {formErrors[`latitude${index + 1}`]}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                          <Col lg={6} className="align-self-end">
                            <Form.Group className="d-flex align-items-center gap-3 mb-3">
                              <Form.Control
                                type="text"
                                placeholder="Longitude"
                                value={location.longitude}
                                onChange={(e) =>
                                  handleLongitudeChange(
                                    index + 1,
                                    e.target.value
                                  )
                                }
                                isInvalid={
                                  !!formErrors[`longitude${index + 1}`]
                                }
                              />
                              <Form.Control.Feedback type="invalid">
                                {formErrors[`longitude${index + 1}`]}
                              </Form.Control.Feedback>
                              <Button
                                className="btn-delete"
                                onClick={() => deleteGeoLocation(location.id)}
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </Button>
                            </Form.Group>
                          </Col>
                        </React.Fragment>
                      ))}
                    </Row>
                  </Col>
                  <Col lg={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>FMB</Form.Label>
                      <Form.Control
                        type="file"
                        placeholder="FMB"
                        onChange={handleFileChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={12} className="text-center">
                    <Button type="submit" className="btn-main me-2">
                      Submit
                    </Button>
                    <Button
                      as={Link}
                      to="/property-registration"
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

export default withAuthRedirect(AddPropertyRegistration);
