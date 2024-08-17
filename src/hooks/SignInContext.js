import React, { createContext, useContext, useState } from 'react';
import { validateEmail, validatePassword } from '../services/ValidationService';
import { useNavigate } from 'react-router-dom';
import SignInService from '../services/SignInService';

const SignInContext = createContext();

export const useSignIn = () => useContext(SignInContext);

export const SignInProvider = ({ children }) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const setError = (field, message) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: message,
    }));
  };

  const handleClickShowPassword = () =>
    setShowPassword((showPassword) => !showPassword);

  const handleEmailBlur = () => {
    if (!validateEmail(formData.email)) {
      setError('email', 'Email inválido.');
    } else {
      setError('email', '');
    }
  };

  const handlePasswordBlur = () => {
    if (!validatePassword(formData.password)) {
      setError(
        'password',
        'A senha deve ter pelo menos 8 caracteres, com um caractere especial, numérico e alfanumérico.'
      );
    } else {
      setError('password', '');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      SignInService.authenticateUser(formData);
      setTimeout(() => navigate('/leads'), 2000);
    } catch (error) {
      if (error.message === 'senha') {
        setError('password', 'Senha inválida.');
      } else {
        setError('email', 'Credenciais inválidas.');
      }
    }
  };

  return (
    <SignInContext.Provider
      value={{
        showPassword,
        formData,
        errors,
        handleClickShowPassword,
        handleInputChange,
        handleEmailBlur,
        handlePasswordBlur,
        handleSubmit,
      }}
    >
      {children}
    </SignInContext.Provider>
  );
};
