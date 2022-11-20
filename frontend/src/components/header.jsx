import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Button from './button';
import MasterProvider from '../context';

function Header({ name }) {
  const master = useContext(MasterProvider);
  const { makeLogOut } = master;

  return (
    <header className="header-container">
      <div className="name-header">{name}</div>

      <Button
        buttonName="Sair"
        className="logout-btn"
        handleClick={() => makeLogOut()}
      />
    </header>
  );
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Header;
