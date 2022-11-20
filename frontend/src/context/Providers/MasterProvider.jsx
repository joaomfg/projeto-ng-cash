/* eslint-disable no-console */
import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import MyContext from '../index';
import {
  sendData,
  sendDataToken,
  sendTransaction,
  requestData,
} from '../../services/request';
import { getLocalStorage, setLocalStorage } from '../../helpers/localStorage';

export default function MasterProvider({ children }) {
  const [user, setUser] = useState({});
  const [transactions, setTransactions] = useState([]);

  const navigate = useNavigate();

  const { token } = getLocalStorage('user') || {};

  useEffect(() => {
    if (token !== undefined) {
      sendDataToken('login/validate', token)
        .then((data) => {
          setUser(data.user);
          setTransactions(data.transactions);
          navigate('/account');
        })
        .catch((error) => console.log(error.response.data.error));
    } else {
      navigate('/');
    }
  }, [token]);

  const makeLogin = (body) => {
    const response = sendData('login/', body)
      .then((data) => {
        setLocalStorage('user', data);
        navigate('/account');
      })
      .catch((error) => error.response.data);

    return response;
  };

  const register = (body) => {
    const response = sendData('login/register', body)
      .then((data) => {
        setLocalStorage('user', data);
        navigate('/account');
      })
      .catch((error) => error.response.data);

    return response;
  };

  const getUserAccount = (id) => {
    const response = requestData(`login/${id}`, token)
      .then((data) => data)
      .catch((error) => error.response.data);

    return response;
  };

  const makeTransaction = (body) => {
    const response = sendTransaction('transaction/', body, token)
      .then((data) => setTransactions([...transactions, data]))
      .catch((error) => error.response.data);

    return response;
  };

  const filterTransactions = (id, body) => {
    const response = sendTransaction(`transaction/filter/${id}`, body, token)
      .then((data) => setTransactions(data))
      .catch((error) => console.log(error.response.data));

    return response;
  };

  const makeLogOut = () => {
    // eslint-disable-next-line no-undef
    localStorage.clear();
    setUser({});
    setTransactions([]);
    navigate('/');
  };

  const contextValue = {
    user,
    transactions,
    makeLogin,
    register,
    makeTransaction,
    getUserAccount,
    filterTransactions,
    makeLogOut,
  };

  const value = useMemo(() => contextValue, [contextValue]);

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
}

MasterProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
