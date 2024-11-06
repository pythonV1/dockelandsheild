import React from 'react';
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
import GeoMapTwo from '../components/GeoMapTwo';
import withAuthRedirect from '../hoc/withAuthRedirect'; // Import the HOC

const SurveyDetailsTwo = () => {
  const details = [
    {
      propertyID: '869856',
      propertyReferenceName: 'Site 2',
      deviceCount: '6',
      batteryStatus: '50%',
      gForce: '1',
      lastUpdated: '20-03-2022 10:00 A.M',
      custName: 'Ram',
      district: 'Chengalpattu',
      taluk: 'Tambaram',
      village: 'Sembakkam',
      surNum: '110',
      surSubDiv: '3A',
      patta: '678409',
      area: 'Hect 03 Ares 40.50',
      document: 'FMB 2',
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
          <Card className="main-card survey-detail">
            <CardBody>
              <Row className="g-3">
                <Col lg={12}>
                  <Row className="row-cols-1 row-cols-sm-1 row-cols-lg-2 row-cols-xl-4 g-3">
                    <Col>
                      <p>
                        <FontAwesomeIcon icon={faAddressCard} />{' '}
                        <span>Property ID :</span> {details[0].propertyID}
                      </p>
                    </Col>
                    <Col>
                      <p>
                        <FontAwesomeIcon icon={faLayerGroup} />{' '}
                        <span>Property Name :</span>{' '}
                        {details[0].propertyReferenceName}
                      </p>
                    </Col>
                    <Col>
                      <p>
                        <FontAwesomeIcon icon={faDesktop} />
                        <span> Device Count :</span> {details[0].deviceCount}
                      </p>
                    </Col>
                    <Col>
                      <p>
                        <FontAwesomeIcon icon={faForward} />{' '}
                        <span>G Force :</span> {details[0].gForce}
                      </p>
                    </Col>
                  </Row>
                </Col>
                <Col lg="6">
                  <Card>
                    <CardBody>
                      <p>
                        <FontAwesomeIcon icon={faUser} />{' '}
                        <span>Customer Name : </span> {details[0].custName}
                      </p>
                      <p>
                        <FontAwesomeIcon icon={faLocationDot} />{' '}
                        <span>District : </span> {details[0].district}
                      </p>
                      <p>
                        <FontAwesomeIcon icon={faLayerGroup} />{' '}
                        <span>Village : </span> {details[0].village}
                      </p>
                      <p>
                        <FontAwesomeIcon icon={faLayerGroup} />
                        <span>Taluk : </span> {details[0].taluk}
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
                        {details[0].surNum}
                      </p>
                      <p>
                        <FontAwesomeIcon icon={faLayerGroup} />{' '}
                        <span>Survey Sub Division : </span>
                        {details[0].surSubDiv}
                      </p>
                      <p>
                        <FontAwesomeIcon icon={faLayerGroup} />{' '}
                        <span>Patta : </span>
                        {details[0].patta}
                      </p>
                      <p>
                        <FontAwesomeIcon icon={faLayerGroup} />{' '}
                        <span>Area : </span>
                        {details[0].area}
                      </p>
                      <p>
                        <FontAwesomeIcon icon={faLayerGroup} />{' '}
                        <span>Document : </span>
                        {details[0].document}
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg={12}>
                  <Card>
                    <CardBody>
                      <GeoMapTwo />
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
        </Col>
      </Row>
    </Container>
  );
};

export default withAuthRedirect(SurveyDetailsTwo);
