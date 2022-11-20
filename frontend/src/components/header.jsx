import React from 'react';
import PropTypes from 'prop-types';
import Button from './button';

function Header({ name, balance }) {
  return (
    <header className="header-container">
      <div className="items-container">
        <div className="items-btn">{`R$${balance},00`}</div>
      </div>

      <div className="logout-container">
        <Button
          buttonName={name}
          className="user-btn"
        />
        <Button
          buttonName="Sair"
          className="logout-btn"
        //   handleClick={handleLogout}
        />
      </div>
    </header>
  );
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  balance: PropTypes.number.isRequired,
};

export default Header;
