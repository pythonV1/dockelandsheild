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
import axios from 'axios';
import API_BASE_URL from '../config';
import withAuthRedirect from '../hoc/withAuthRedirect'; // Import the HOC

axios.defaults.xsrfHeaderName = 'X-CSRFToken'; // Set the X-CSRFToken header name
axios.defaults.xsrfCookieName = 'csrftoken'; // Set the CSRF token cookie name

const AddPipeline = () => {
  const [geoLocations, setGeoLocations] = useState([
    { id: Date.now(), latitude: null, longitude: null },
  ]);
  const [pipelineID, setPipelineID] = useState('');
  const [pipelineName, setPipelineName] = useState('');
  const [pipelineDescription, setPipelineDescription] = useState('');
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { pipeline } = location.state || {};
  const customer_id = localStorage.getItem('id');

  // Fetch Projects and Users
  useEffect(() => {
    const fetchProjectsAndUsers = async () => {
      try {
        
        const projectsResponse = await axios.get(`${API_BASE_URL}/projects/customer/${customer_id}/`); // Adjust endpoint as needed
        const usersResponse = await axios.get(`${API_BASE_URL}/users/customer/${customer_id}/`);
        setProjects(projectsResponse.data);
        console.log(setProjects);
        setUsers(usersResponse.data);
      } catch (error) {
        console.error('Error fetching projects and users:', error);
      }
    };
    fetchProjectsAndUsers();
  }, []);

  useEffect(() => {
    if (pipeline) {
      setPipelineID(pipeline.id);
      setPipelineName(pipeline.pipeline_name);
      setPipelineDescription(pipeline.pipeline_descriptions);
      console.log('hello222',pipeline.project_id)
      console.log('hello',pipeline.pipeline_name)
      console.log('vineesh')
      setSelectedProject(pipeline.project_id);
      setSelectedUsers(pipeline.users.map(user => user.id));
    }
  }, [pipeline]);

  const handleChange = (e, fieldName) => {
    switch (fieldName) {
      case 'pipelineName':
        setPipelineName(e.target.value);
        break;
      case 'pipelineDescription':
        setPipelineDescription(e.target.value);
        break;
      case 'selectedProject':
        setSelectedProject(e.target.value);
        break;
      case 'selectedUsers':
        const selected = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedUsers(selected);
        break;
      default:
        break;
    }
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
    if (!pipelineName) {
      errors.pipelineName = 'Pipeline Name is required';
    }
    if (!selectedProject) {
      errors.selectedProject = 'Project is required';
    }
    if (selectedUsers.length === 0) {
      errors.selectedUsers = 'At least one user must be selected';
    }

    // Set the form errors
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return; // Stop submission if there are errors
    }

    try {
      const formData = new FormData();
      formData.append('project', selectedProject);
      formData.append('pipeline_name', pipelineName);
      formData.append('pipeline_descriptions', pipelineDescription);
      formData.append('customer', customer_id);
      selectedUsers.forEach(user => {
        formData.append('users', user);
      });
      if (pipeline) {
        await axios.put(
          `${API_BASE_URL}/pipeline/update/${pipeline.pipeline_id}/`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
      } else {
        await axios.post(`${API_BASE_URL}/pipeline/add/`, formData);
      }
      navigate('/pipelines');
    } catch (error) {
      console.error('Error adding/updating pipeline:', error.message);
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
                      <Form.Label>Pipeline Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Pipeline Name"
                        value={pipelineName}
                        onChange={(e) => handleChange(e, 'pipelineName')}
                        isInvalid={!!formErrors.pipelineName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.pipelineName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col lg={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Pipeline Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={1}
                        placeholder="Provide a brief description of the pipeline"
                        value={pipelineDescription}
                        onChange={(e) => handleChange(e, 'pipelineDescription')}
                      />
                    </Form.Group>
                  </Col>

                  <Col lg={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Project</Form.Label>
                      <Form.Control
                        as="select"
                        value={selectedProject}
                        onChange={(e) => handleChange(e, 'selectedProject')}
                        isInvalid={!!formErrors.selectedProject}
                      >
                        <option value="">Select Project</option>
                        {projects.map((project) => (
                          <option key={project.project_id} value={project.project_id}>
                            {project.project_name}
                          </option>
                        ))}
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                        {formErrors.selectedProject}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col lg={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Users</Form.Label>
                      <Form.Control
                        as="select"
                        multiple
                        value={selectedUsers}
                        onChange={(e) => handleChange(e, 'selectedUsers')}
                        isInvalid={!!formErrors.selectedUsers}
                      >
                        {users.map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.username}
                          </option>
                        ))}
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                        {formErrors.selectedUsers}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col lg={12} className="text-center">
                    <Button type="submit" className="btn-main me-2">
                      Submit
                    </Button>
                    <Button
                      as={Link}
                      to="/pipelines"
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

export default withAuthRedirect(AddPipeline);
