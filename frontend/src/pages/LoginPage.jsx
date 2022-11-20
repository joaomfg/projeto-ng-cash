import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/input';
import Button from '../components/button';
import ErrorMessage from '../components/errorMessage';
import MasterProvider from '../context';

function LoginPage() {
  const master = useContext(MasterProvider);
  const { makeLogin } = master;

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

  const handleLogin = async () => {
    const response = await makeLogin({ username, password });

    if (response !== undefined) {
      setisModalError(true);
      setErrorMessage(response.error);
    }
  };

  return (
    <section className="main-section">
      <p className="title">Bem-vindo(a) a NG.CASH!</p>

      <div className="login-container">
        <Input
          className="text-input"
          labelClassname="label-input"
          labelName="Nome de usuário"
          type="text"
          name="username"
          value={username}
          placeholder=""
          handleChange={handleChange}
        />
        <Input
          className="text-input"
          labelClassname="label-input"
          labelName="Senha"
          type="password"
          name="password"
          value={password}
          placeholder="********"
          handleChange={handleChange}
        />
        <Button
          className="primary-btn"
          buttonName="LOGIN"
          handleClick={handleLogin}
          isDisabled={isDisabled}
        />
        <Link to="/register">
          <Button
            className="tertiary-btn"
            buttonName="Ainda não tenho conta"
            handleClick={() => {}}
            disabled={false}
          />
        </Link>
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

export default LoginPage;
