import React, { useState, useContext } from "react";
import GenericInput from "../components/genericInput";
import GenericButton from "../components/genericButton";
import ErrorMessage from '../components/errorMessage';
import { Link } from "react-router-dom";
import MasterProvider from "../context";

function LoginPage() {
  const master = useContext(MasterProvider);
  const { makeLogin } = master;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [isModalError, setisModalError] = useState(false);

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
      case "username":
        setUsername(value);
        handleDisabled(value, password);
        break;
      case "password":
        setPassword(value);
        handleDisabled(username, value);
        break;
      default:
        break;
    }
  };

  const handleLogin = () => {
    try {
      makeLogin({ username, password });
    } catch (err) {
      setisModalError(true);
    }
  };

  return (
    <section className="main-section">
      <p className="title">Bem-vindo(a) a NG.CASH!</p>
      <div className="login-container">
        <GenericInput
          className="text-input"
          labelClassname="label-input"
          labelName="Login"
          type="text"
          name="username"
          value={username}
          placeholder="Nome de usuário"
          handleChange={handleChange}
        />
        <GenericInput
          className="text-input"
          labelClassname="label-input"
          labelName="Password"
          type="password"
          name="password"
          value={password}
          placeholder="********"
          handleChange={handleChange}
        />
        <GenericButton
          className="primary-btn"
          buttonName="LOGIN"
          handleClick={ handleLogin }
          isDisabled={isDisabled}
        />
        <Link to="/register">
          <GenericButton
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
        message="Email ou senha inválidos"
      />
    )}
    </section>
  );
}

export default LoginPage;
