import React, { useState, useContext } from 'react';
import Button from '../components/button';
import Input from '../components/input';
import ErrorMessage from '../components/errorMessage';
import MasterProvider from '../context';

function RegisterPage() {
  const master = useContext(MasterProvider);
  const { register } = master;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [isModalError, setisModalError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleDisabled = (n, p) => {
    if (n.length >= 3 && p.length >= 8) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;

    switch (name) {
      case 'username':
        setUsername(value);
        handleDisabled(value, password);
        break;
      case 'password':
        setPassword(value);
        handleDisabled(username, value);
        break;
      default:
        break;
    }
  };

  const handleRegister = async () => {
    const response = register({ username, password });

    if (response === undefined) {
      setisModalError(true);
      setErrorMessage(response.error);
    }
  };

  return (
    <section className="main-section">
      <p className="title">Cadastro</p>
      <div className="login-container">
        <Input
          className="text-input"
          labelClassname="label-input"
          labelName="Nome"
          type="text"
          name="username"
          value={username}
          placeholder="Seu Nome"
          handleChange={handleChange}
        />
        <Input
          className="text-input"
          labelClassname="label-input"
          labelName="Senha"
          type="password"
          name="password"
          value={password}
          placeholder="(min. 8 caracteres)"
          handleChange={handleChange}
        />
        <Button
          className="primary-btn"
          buttonName="Cadastrar"
          handleClick={handleRegister}
          isDisabled={isDisabled}
        />
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

export default RegisterPage;
