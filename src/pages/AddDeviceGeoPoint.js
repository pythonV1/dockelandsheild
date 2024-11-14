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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../config';
import PageHelmet from '../components/PageHelmet';
import PageTitle from '../components/PageTitle';
import withAuthRedirect from '../hoc/withAuthRedirect';

const ProjectDeviceManagement = () => {
    const [pipelines, setPipelines] = useState([]);
    const [devices, setDevices] = useState([]);
    const [selectedPipeline, setSelectedPipeline] = useState("");
    const [geoLocations, setGeoLocations] = useState([]);
    const [propertyDeviceList, setPropertyDeviceList] = useState([]);
    const [formErrors, setFormErrors] = useState({});
    const [submissionStatus, setSubmissionStatus] = useState(null);
    const navigate = useNavigate();
    const customer_id = localStorage.getItem('id');

    useEffect(() => {
        const fetchPipelines = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/pipelines/customer/${customer_id}/`);
                setPipelines(response.data);
            } catch (error) {
                console.error('Error fetching pipelines:', error);
            }
        };
        fetchPipelines();
    }, [customer_id]);

    useEffect(() => {
        const fetchDevices = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/devices/customer/${customer_id}/`);
                setDevices(response.data);
            } catch (error) {
                console.error('Error fetching devices:', error);
            }
        };
        fetchDevices();
    }, []);

    useEffect(() => {
        const fetchGeoLocations = async () => {
            if (selectedPipeline) {
                try {
                    const response = await axios.get(`${API_BASE_URL}/geolocations/pipeline/${selectedPipeline}/`);
                    setGeoLocations(response.data);
                    setPropertyDeviceList(response.data.map(location => ({
                        id: location.id, // Unique identifier for each location
                        latitude: location.latitude,
                        longitude: location.longitude,
                        geolocation: location.id, // Store location ID here
                        device: location.device_id,
                    })));
                } catch (error) {
                    console.error("Error fetching geo locations:", error);
                }
            }
        };
        fetchGeoLocations();
    }, [selectedPipeline]);

    const handlePipelineChange = (pipelineId) => {
        setSelectedPipeline(pipelineId);
    };

    const handleDeviceIdChange = (index, value) => {
        const updatedList = [...propertyDeviceList];
        updatedList[index].device = value;
        setPropertyDeviceList(updatedList);
    };

    const addProDevice = () => {
        setPropertyDeviceList([
            ...propertyDeviceList,
            { id: Date.now(), latitude: "", longitude: "", geolocation: "", device: "" },
        ]);
    };

    const getDisabledDevices = () => {
        return propertyDeviceList.map(propertyDevice => propertyDevice.device).filter(Boolean);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const dataToSubmit = propertyDeviceList.map(device => ({
            pipeline: selectedPipeline,
            pipeline_id: selectedPipeline,
            device: device.device,
            geolocation: device.geolocation,  // Submit geolocation ID here
            device_movement: device.device_movement || 0,
        }));

        try {
            const response = await axios.post(`${API_BASE_URL}/api/device-geopoints/`, dataToSubmit);
            setSubmissionStatus({ success: true, message: "Devices added successfully!" });
            setPropertyDeviceList([]);
            navigate('/device-geopoint');
            /*setSelectedProject("");*/
        } catch (error) {
            setSubmissionStatus({ success: false, message: "Failed to add devices, Duplcate Device are not allowed." });
            console.error('Error submitting data:', error);
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
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Select Pipeline</Form.Label>
                                    <Form.Select
                                        value={selectedPipeline}
                                        onChange={(e) => handlePipelineChange(e.target.value)}
                                    >
                                        <option value="">Select a Pipeline</option>
                                        {pipelines.map((pipeline) => (
                                            <option key={pipeline.pipeline_id} value={pipeline.pipeline_id}>
                                                {pipeline.pipeline_name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>                        

                                {selectedPipeline && geoLocations.length > 0 && (
                                    <Row>
                                        {propertyDeviceList.map((propertyDevice, index) => (
                                            <React.Fragment key={propertyDevice.id}>
                                                <Col lg={6}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Geo Location</Form.Label>
                                                        <Form.Control
                                                            plaintext
                                                            readOnly
                                                            value={`${propertyDevice.latitude}, ${propertyDevice.longitude}`}
                                                        />
                                                    </Form.Group>
                                                </Col>

                                                <Col lg={6}>
                                                    <div className="d-flex align-items-center gap-3">
                                                        <Form.Group className="w-100 mb-3">
                                                            <Form.Label>Device ID</Form.Label>
                                                            <Form.Select
                                                                aria-label="Select Device ID"
                                                                value={propertyDevice.device}
                                                                onChange={(e) =>
                                                                    handleDeviceIdChange(index, e.target.value)
                                                                }
                                                                isInvalid={!!formErrors[`device${index}`]}
                                                            >
                                                                <option value="">Select Device ID</option>
                                                                {devices.map((device) => {
                                                                    const isDisabled = getDisabledDevices().includes(device.tab_id);
                                                                    return (
                                                                        <option key={device.tab_id} value={device.tab_id} disabled={isDisabled}>
                                                                            {device.device_id}
                                                                        </option>
                                                                    );
                                                                })}
                                                            </Form.Select>
                                                            <Form.Control.Feedback type="invalid">
                                                                {formErrors[`device${index}`]}
                                                            </Form.Control.Feedback>
                                                        </Form.Group>

                                                        {index === 'rrrr' && (
                                                            <Button className="btn-edit mt-3" onClick={addProDevice}>
                                                                <FontAwesomeIcon icon={faPlus} />
                                                            </Button>
                                                        )}
                                                    </div>
                                                </Col>
                                            </React.Fragment>
                                        ))}
                                    </Row>
                                )}

                                <Button type="submit" className="mt-3">Submit</Button>

                                {submissionStatus && (
                                    <div className={`mt-3 text-${submissionStatus.success ? 'success' : 'danger'}`}>
                                        {submissionStatus.message}
                                    </div>
                                )}
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default withAuthRedirect(ProjectDeviceManagement);
