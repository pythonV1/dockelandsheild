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
import GeoMap from '../components/GeoMap';
import { imgPath } from '../components/Constants';
import axios from 'axios'; // Import axios for making API requests
import API_BASE_URL from '../config';
import { useParams } from 'react-router-dom';
import withAuthRedirect from '../hoc/withAuthRedirect'; // Import the HOC

const SurveyDetails = () => {
  const [surveyData, setSurveyData] = useState({});
  const [dataFetched, setDataFetched] = useState(false);
  const { id } = useParams(); // Access the dynamic parameter from the URL

  useEffect(() => {
    const fetchSurveyData = async () => {
      try {
        // Generate a timestamp to  in the request URL
        const timestamp = Date.now();
        const response = await axios.get(
          `${API_BASE_URL}/survey-details/${id}/?timestamp=${timestamp}`
        ); // Fetch data based on the ID
        setSurveyData(response.data); // Update state with the fetched data
        setDataFetched(true); // Set dataFetched to true after data is fetched
        console.log('Helooo444::::', response.data);
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
  return (
    <Container fluid className="section">
      <PageHelmet />
      <Row className="g-3">
        <Col lg={12}>
          <PageTitle />
        </Col>
        <Col lg={12}>
          {dataFetched && ( // Only render when data is fetched
            <Card className="main-card survey-detail">
              <CardBody>
                <Row className="g-3">
                  <Col lg={12}>
                    <Row className="row-cols-1 row-cols-sm-1 row-cols-lg-2 row-cols-xl-4 g-3">
                      <Col>
                        <p>
                          <FontAwesomeIcon icon={faAddressCard} />{' '}
                          <span>Property ID :</span>{' '}
                          {surveyData && surveyData.survey_details
                            ? surveyData.survey_details.survey_number
                            : null}
                        </p>
                      </Col>
                      <Col>
                        <p>
                          <FontAwesomeIcon icon={faLayerGroup} />{' '}
                          <span>Property Name :</span>{' '}
                          {surveyData && surveyData.survey_details
                            ? surveyData.survey_details.property_name
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
                      <Col>
                        <p>
                          <FontAwesomeIcon icon={faForward} />{' '}
                          <span>G Force :</span> #####
                        </p>
                      </Col>
                    </Row>
                  </Col>
                  <Col lg="6">
                    <Card>
                      <CardBody>
                        <p>
                          <FontAwesomeIcon icon={faUser} />{' '}
                          <span>Customer Name : </span>
                          {surveyData && surveyData.survey_details
                            ? surveyData.survey_details.customer_name
                            : null}
                        </p>
                        <p>
                          <FontAwesomeIcon icon={faLocationDot} />{' '}
                          <span>District : </span>{' '}
                          {surveyData && surveyData.survey_details
                            ? surveyData.survey_details.district_name
                            : null}
                        </p>
                        <p>
                          <FontAwesomeIcon icon={faLayerGroup} />{' '}
                          <span>Village : </span>{' '}
                          {surveyData && surveyData.survey_details
                            ? surveyData.survey_details.village_name
                            : null}
                        </p>
                        <p>
                          <FontAwesomeIcon icon={faLayerGroup} />
                          <span>Taluk : </span>{' '}
                          {surveyData && surveyData.survey_details
                            ? surveyData.survey_details.taluk_name
                            : null}
                        </p>
                        <p>
                          <FontAwesomeIcon icon={faCalendarDays} />{' '}
                          <span>Last Updated :</span> {details[0].lastUpdated}
                        </p>
                      </CardBody>
                    </Card>
                  </Col>
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
                  </Col>
                  <Col lg={12}>
                    <Card>
                      <CardBody>
                        {surveyData && <GeoMap surveyData={surveyData} />}
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg={12} className="text-center">
                    <BackButton
                      buttonText={'Back'}
                      path="/property-device"
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
