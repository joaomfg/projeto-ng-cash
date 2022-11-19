import React, { useState, useContext } from 'react';
import GenericButton from '../components/genericButton';
import GenericInput from '../components/genericInput';
import ErrorMessage from '../components/errorMessage';
import MasterProvider from "../context";

function RegisterPage() {
    const master = useContext(MasterProvider);
    const { register } = master;

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

  const handleRegister = async () => {
    try {
      const a = register({ username, password });
      console.log(a);

      if (a === undefined) {
        setisModalError(true);
      }
    } catch (err) {
      setisModalError(true);
      console.log(err.message);
    }
  };

  return (
    <section className="main-section">
      <p className="title">Cadastro</p>
      <div className="login-container">
        <GenericInput
          className="text-input"
          labelClassname="label-input"
          labelName="Nome"
          type="text"
          name="username"
          value={ username }
          placeholder="Seu Nome"
          handleChange={ handleChange }
        />
        <GenericInput
          className="text-input"
          labelClassname="label-input"
          labelName="Senha"
          type="password"
          name="password"
          value={ password }
          placeholder="(min. 8 caracteres)"
          handleChange={ handleChange }
        />
        <GenericButton
          className="primary-btn"
          buttonName="Cadastrar"
          handleClick={ handleRegister }
          isDisabled={ isDisabled }
        />
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

export default RegisterPage;
