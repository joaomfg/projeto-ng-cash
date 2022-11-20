import React from 'react';
import PropTypes from 'prop-types';
import Button from './button';

function Header({ name }) {
  return (
    <header className="header-container">
      <div className="name-header">{name}</div>

      <Button
        buttonName="Sair"
        className="logout-btn"
      />
    </header>
  );
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Header;
