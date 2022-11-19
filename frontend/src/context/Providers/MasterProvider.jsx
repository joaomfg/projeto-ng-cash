/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React, { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import MyContext from "../index";
import { sendData, sendDataToken } from "../../services/request";
import { getLocalStorage, setLocalStorage } from '../../helpers/localStorage';
import { useNavigate } from "react-router-dom";

export default function MasterProvider({ children }) {
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  const { token } = getLocalStorage('user') || {};

  useEffect(() => {
    if (token !== undefined) {
      sendDataToken("login/validate", token)
        .then((data) => {
          setUser(data);
          navigate('/account');
        })
        .catch((error) => console.log(error.response.data.message));
    }
  }, [token]);

  const makeLogin = (body) => {
    sendData('login/', body)
      .then((data) => {
        setLocalStorage('user', data);
      })
      .catch((error) => console.log(error));
  };

  const register = (body) => {
    sendData('login/register', body)
    .then((data) => {
      setLocalStorage('user', data);
      navigate('/account');
    })
    .catch((error) => console.log(error));
  };

  const contextValue = {
    user,
    makeLogin,
    register,
  };

  const value = useMemo(() => contextValue, [contextValue]);

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
}

MasterProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
