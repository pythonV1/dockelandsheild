import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Col, Container, Form, Row, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket, faPlus } from '@fortawesome/free-solid-svg-icons';
import { imgPath } from '../components/Constants';
import PageHelmet from '../components/PageHelmet';

const Signup = () => {
    return (
        <div className='login-bg'>
            <PageHelmet />
            <Container>
                <Row className='justify-content-center'>
                    <Col lg={6}>
                        <Card className='login-card'>
                            <Card.Header>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <h4>Sign Up</h4>
                                    <div>
                                        {/* <Link to="/">Forgot password</Link> */}
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={
                                                <Tooltip>
                                                    Sign In
                                                </Tooltip>
                                            }
                                        >
                                            <Link to="/" >
                                                <FontAwesomeIcon icon={faArrowRightToBracket} />
                                            </Link>
                                        </OverlayTrigger>
                                    </div>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <div className='login-logo-box'>
                                    <img src={imgPath.logo} className='logo' alt='logo' />
                                </div>
                                <Form className='default-form'>
                                    <Form.Group className="mb-3" >
                                        <Form.Control type="text" placeholder="Username" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                        <Form.Control type="email" placeholder="Email" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                        <Form.Control type="password" placeholder="Password" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                        <Form.Control type="password" placeholder="Conform Password" />
                                    </Form.Group>
                                    <Form.Group className="mb-3 text-center">
                                        <Button as={Link} to="/" className="btn btn-main">
                                            <FontAwesomeIcon icon={faPlus} className='me-2' />
                                            Sign Up
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Signup;
