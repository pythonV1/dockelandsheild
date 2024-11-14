import React, { useState, useEffect } from 'react';
import { Card, CardBody, Col, Container, Row } from 'react-bootstrap';
import PageHelmet from '../components/PageHelmet';
import PageTitle from '../components/PageTitle';
import BackButton from '../components/BackButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAddressCard,
  faBatteryThreeQuarters,
  faCalendarDays,
  faDesktop,
  faForward,
  faLayerGroup,
  faLocationDot,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import ProjectGeoMap from '../components/ProjectGeoMap';
import { imgPath } from '../components/Constants';
import axios from 'axios'; // Import axios for making API requests
import API_BASE_URL from '../config';
import { useParams } from 'react-router-dom';
import withAuthRedirect from '../hoc/withAuthRedirect'; // Import the HOC

const SurveyDetails = () => {
  const [surveyData, setSurveyData] = useState({});
  const [surveyDataArray, setSurveyRow] = useState({});
  const [dataFetched, setDataFetched] = useState(false);
  const { id } = useParams(); // Access the dynamic parameter from the URL

  useEffect(() => {
    const fetchSurveyData = async () => {
      try {
        // Generate a timestamp to  in the request URL
        const timestamp = Date.now();
        const response = await axios.get(
          `${API_BASE_URL}/project-survey-details/${id}/?timestamp=${timestamp}`
        ); // Fetch data based on the ID
        setSurveyRow(response.data.surveyData); // Update state with the fetched data
        setSurveyData(response.data.surveyRow); // Update state with the fetched data
        setDataFetched(true); // Set dataFetched to true after data is fetched
        console.log('Helooo444::::', response.data);
        console.log('Helooo444%%%%%::::', response.data.surveyRow);
      } catch (error) {
        console.error('Error fetching survey data:', error);
      }
    };

    fetchSurveyData(); // Call the fetchSurveyData function when the component mounts
  }, [id]);
  const details = [
    {
      propertyID: '869856',
      propertyReferenceName: 'Site 1',
      deviceCount: '6',
      gForce: '1',
      lastUpdated: '	02-01-2021 12:23 P.M',
      custName: 'Karthick',
      district: 'Ramanathapuram',
      taluk: 'Ramanathapuram',
      village: 'Mandapam[66]',
      surNum: '109',
      surSubDiv: '2A',
      patta: '820923',
      area: 'Hect 00 Ares 40.50',
      document: `${imgPath.SurveyOnePdf}`,
    },
  ];

  const surveyData1 = {
    "survey_details": {
      "property_name": "project1", // Fixed typo
      "pipeline_name": "pipeline2", // Fixed typo
      "project_state": "project1", // Fixed typo
      "project_city": "project1", // Fixed typo
      "p_type": "project"
    },
    "devices": [
      {
        "device_id": "Dileep32",
        "device_type": "Bluetooth",
        "battery_status": "",
        "device_status": true,
        "latitude": 13.06,
        "longitude": 77.51444,
        "device_movement": 0,
        "last_updated": "2024-11-14",
        "points": 1
      },
      {
        "device_id": "Dileep33",
        "device_type": "Bluetooth",
        "battery_status": "",
        "device_status": true,
        "latitude": 13.067,
        "longitude": 77.5444,
        "device_movement": 0,
        "last_updated": "2024-11-14",
        "points": 2
      }
    ]
  };
  
  const surveyData2 = {
    "survey_details": {
      "property_name": "project1", // Fixed typo
      "pipeline_name": "pipeline1", // Fixed typo
      "project_state": "project1", // Fixed typo
      "project_city": "project1", // Fixed typo
      "p_type": "project"
    },
    "devices": [
      {
        "device_id": "Dileep30",
        "device_type": "Bluetooth",
        "battery_status": "",
        "device_status": true,
        "latitude": 13.06,
        "longitude": 77.43444,
        "device_movement": 0,
        "last_updated": "2024-11-14",
        "points": 1
      },
      {
        "device_id": "Dileep31",
        "device_type": "Bluetooth",
        "battery_status": "",
        "device_status": true,
        "latitude": 13.054,
        "longitude": 77.542,
        "device_movement": 0,
        "last_updated": "2024-11-14",
        "points": 2
      }
    ]
  };
  
  // Create an array of the survey data
  //const surveyDataArray2 = [surveyData1, surveyData2];
  return (
    <Container fluid className="section">
      <PageHelmet />
      <Row className="g-3">
        <Col lg={12}>
        
        </Col>
        <Col lg={12}>
          {dataFetched && ( // Only render when data is fetched
            <Card className="main-card survey-detail">
              <CardBody>
                <Row className="g-3">
                  <Col lg={12}>
                    <Row className="row-cols-4 row-cols-sm-4 row-cols-lg-2 row-cols-xl-2 g-3">
                    
                      <Col>
                        <p>
                          <FontAwesomeIcon icon={faLayerGroup} />{' '}
                          <span>Project Name :</span>{' '}
                          {surveyData && surveyData.property_name
                            ? surveyData.property_name
                            : null}
                        </p>
                      </Col>
                      <Col>
                        <p>
                          <FontAwesomeIcon icon={faLayerGroup} />{' '}
                          <span>Pipeline  Name :</span>{' '}
                          {surveyData && surveyData.pipeline_name
                            ? surveyData.pipeline_name
                            : null}
                        </p>
                      </Col>
                      <Col>
                        <p>
                          <FontAwesomeIcon icon={faDesktop} />
                          <span> Device Count :</span>{' '}
                          {surveyData && surveyData.devices
                            ? surveyData.devices.length
                            : null}
                        </p>
                      </Col>
                      
                    </Row>
                  </Col>
                  <Col lg="12">
                    <Card>
                      <CardBody>
                      
                        <p>
                          <FontAwesomeIcon icon={faLocationDot} />{' '}
                          <span>Project State : </span>{' '}
                          {surveyData && surveyData.survey_details
                            ? surveyData.survey_details.project_state
                            : null}
                        </p>
                        <p>
                          <FontAwesomeIcon icon={faLayerGroup} />{' '}
                          <span>Project City : </span>{' '}
                          {surveyData && surveyData.survey_details
                            ? surveyData.survey_details.project_city
                            : null}
                        </p>
                      
                        <p>
                          <FontAwesomeIcon icon={faCalendarDays} />{' '}
                          <span>Last Updated :</span> {details[0].lastUpdated}
                        </p>
                      </CardBody>
                    </Card>
                  </Col>
                  {surveyData && surveyData.survey_details && surveyData.survey_details.p_type !== 'project' && (
 
                  <Col lg="6">
                    <Card>
                      <CardBody>
                        <p>
                          <FontAwesomeIcon icon={faLayerGroup} />{' '}
                          <span>Survey Number : </span>
                          {surveyData && surveyData.survey_details
                            ? surveyData.survey_details.survey_number
                            : null}
                        </p>
                        <p>
                          <FontAwesomeIcon icon={faLayerGroup} />{' '}
                          <span>Survey Sub Division : </span>
                          {surveyData && surveyData.survey_details
                            ? surveyData.survey_details.survey_sub_division
                            : null}
                        </p>
                        <p>
                          <FontAwesomeIcon icon={faLayerGroup} />{' '}
                          <span>Patta : </span>
                          {surveyData && surveyData.survey_details
                            ? surveyData.survey_details.patta_number
                            : null}
                        </p>
                        <p>
                          <FontAwesomeIcon icon={faLayerGroup} />{' '}
                          <span>Area : </span>
                          {surveyData && surveyData.survey_details
                            ? surveyData.survey_details.area
                            : null}
                        </p>
                        <p>
                          <FontAwesomeIcon icon={faLayerGroup} />{' '}
                          <span>Document : </span>
                          <a
                            href={
                              surveyData && surveyData.survey_details
                                ? `http://localhost:8000${surveyData.survey_details.fmb_url}`
                                : null
                            }
                            target="_blank"
                          >
                            FMB 1
                          </a>
                        </p>
                      </CardBody>
                    </Card>
                  </Col> )}
                  <Col lg={12}>
                    <Card>
                    <CardBody>
                        

                        <ProjectGeoMap surveyDataArray={surveyDataArray} />;
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg={12} className="text-center">
                    <BackButton
                      buttonText={'Back'}
                      path="/device-geopoint"
                    ></BackButton>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default withAuthRedirect(SurveyDetails);
