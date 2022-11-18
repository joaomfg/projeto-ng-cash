/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React, { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import MyContext from "../index";
import { Redirect } from 'react-router-dom';
import { requestData, login } from "../../services/request";
import { getLocalStorage, setLocalStorage } from '../../helpers/localStorage';

export default function MasterProvider({ children }) {
  const [users, setUsers] = useState({});

  const { token } = getLocalStorage('user') || {};

  useEffect(() => {
    if (token !== undefined) {
      requestData("login/validate")
        .then((data) => {
          setLocalStorage('user', data);
          <Redirect to='/account' />
        })
        .catch((error) => console.log(error.response.data.message));
    }
  }, []);

  const makeLogin = (body) => {
    login('login/', body)
      .then((data) => {
        setLocalStorage('user', data);
        <Redirect to='/account' />
      })
      .catch((error) => console.log(error));
  };

  const contextValue = {
    users,
    makeLogin,
  };

  const value = useMemo(() => contextValue, [contextValue]);

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
}

MasterProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
