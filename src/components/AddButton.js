// AddButton.js
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

const AddButton = ({ buttonText, path }) => {
  return (
    <Button as={Link} to={path} className="btn-main">
      <FontAwesomeIcon icon={faCirclePlus} className='me-1' />
      {buttonText}
    </Button>
  );
};

AddButton.propTypes = {
  buttonText: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired, // New prop for the dynamic path
};

export default AddButton;
