import React from 'react';
import PropTypes from 'prop-types';

function Button({
  buttonName, handleClick, isDisabled, className,
}) {
  const LOW_OPACITY = 0.3;
  const HIGH_OPACITY = 1;

  return (
    <button
      type="button"
      className={`${className}`}
      onClick={handleClick}
      disabled={isDisabled}
      style={{ opacity: isDisabled ? LOW_OPACITY : HIGH_OPACITY }}
    >
      {buttonName}
    </button>
  );
}

Button.propTypes = {
  buttonName: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
  isDisabled: PropTypes.bool,
  className: PropTypes.string.isRequired,
};

Button.defaultProps = {
  isDisabled: false,
  handleClick: () => {},
};

export default Button;
