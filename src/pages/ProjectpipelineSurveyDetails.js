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
import PipelineGeoMap from '../components/PipelineGeoMap';
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
          `${API_BASE_URL}/project-pipeline-survey-details/${id}/?timestamp=${timestamp}`
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
                          {surveyData && surveyData.survey_details
                            ? surveyData.survey_details.property_name
                            : null}
                        </p>
                      </Col>
                      <Col>
                        <p>
                          <FontAwesomeIcon icon={faLayerGroup} />{' '}
                          <span>Pipeline  Name :</span>{' '}
                          {surveyData && surveyData.survey_details
                            ? surveyData.survey_details.pipeline_name
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
                          <span>Last Updated :</span>
{surveyData && surveyData.survey_details && surveyData.survey_details.latest_last_updated
    ? new Date(surveyData.survey_details.latest_last_updated).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    : null}

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
                        {surveyData && <PipelineGeoMap surveyData={surveyData} />}
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
