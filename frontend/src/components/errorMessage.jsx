import React from 'react';
import PropTypes from 'prop-types';

function ErrorMessage({ message, className }) {
  return (
    <p
      className={ `${className}` }
    >
      {message}
    </p>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default ErrorMessage;
