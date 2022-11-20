import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Input from './input';
import Button from './button';
import ErrorMessage from './errorMessage';
import MasterProvider from '../context';

export default function TransactionForms({ userId }) {
  const master = useContext(MasterProvider);
  const { makeTransaction } = master;

  const [creditUser, setCreditUser] = useState('');
  const [totalValue, setAmount] = useState('');
  const [isModalError, setisModalError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const handleDisabled = (n, v) => {
    if (n.length >= 3 && v > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const defaultHandler = ({ target }) => {
    const { value, name } = target;

    if (name === 'creditUser') {
      setCreditUser(value);
      handleDisabled(value, totalValue);
    } else {
      setAmount(value);
      handleDisabled(creditUser, value);
    }
  };

  const handleNewTransaction = async () => {
    const response = await makeTransaction({
      debitUserId: userId,
      creditUser,
      value: totalValue,
    });

    if (response !== undefined) {
      setisModalError(true);
      setErrorMessage(response.error);
    }
  };

  return (
    <section>
      <div className="account-forms">
        <h2>Realize uma transação para alguém!</h2>

        <div className="transaction-container">
          <Input
            type="text"
            name="creditUser"
            value={creditUser}
            handleChange={defaultHandler}
            placeholder="fulano"
            className=""
            labelClassname="label-nr"
            labelName="Nome do usuario"
          />

          <Input
            type="number"
            name="totalValue"
            value={totalValue}
            handleChange={defaultHandler}
            placeholder="R$ 100,00"
            className=""
            labelClassname="label-nr"
            labelName="Valor"
          />

          <Button
            buttonName="ENVIAR"
            isDisabled={isDisabled}
            className="secondary-btn"
            handleClick={handleNewTransaction}
          />
        </div>
      </div>
      {isModalError && (
        <ErrorMessage
          className="error-message"
          message={errorMessage}
        />
      )}
    </section>
  );
}

TransactionForms.propTypes = {
  userId: PropTypes.number.isRequired,
};
