// AddButton.js
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BackButton = ({ buttonText, path }) => {
  return (
    <Button as={Link} to={path} className="btn-main px-4 py-2">
      {buttonText}
    </Button>
  );
};

BackButton.propTypes = {
  buttonText: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired, // New prop for the dynamic path
};

export default BackButton;
