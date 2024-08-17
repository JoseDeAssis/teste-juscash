import React, { createContext, useContext, useState } from 'react';
import {
  validateEmail,
  validateFullName,
  validatePassword,
  validatePasswordMatch,
} from '../services/ValidationService';
import SignUpService from '../services/SignUpService';
import { useNavigate } from 'react-router-dom';

const SignUpContext = createContext();

export const useSignUp = () => useContext(SignUpContext);

export const SignUpProvider = ({ children }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'error',
  });
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    nomeCompleto: '',
    email: '',
    password: '',
    confirmPassword: '',
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
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((showConfirmPassword) => !showConfirmPassword);

  const handleNomeCompletoBlur = () => {
    if (!validateFullName(formData.nomeCompleto)) {
      setError('nomeCompleto', 'O nome deve ter pelo menos 3 caracteres.');
    } else {
      setError('nomeCompleto', '');
    }
  };

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

  const handleConfirmPasswordBlur = () => {
    if (!validatePasswordMatch(formData.password, formData.confirmPassword)) {
      setError('confirmPassword', 'A senha e a confirmação devem ser iguais.');
    } else {
      setError('confirmPassword', '');
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      SignUpService.registerUser(formData);
      setAlert({
        open: true,
        message: 'Cadastro realizado com sucesso!',
        severity: 'success',
      });
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setAlert({ open: true, message: error.message, severity: 'error' });
    }
  };

  return (
    <SignUpContext.Provider
      value={{
        showPassword,
        showConfirmPassword,
        formData,
        errors,
        alert,
        handleClickShowPassword,
        handleClickShowConfirmPassword,
        handleInputChange,
        handleNomeCompletoBlur,
        handleEmailBlur,
        handlePasswordBlur,
        handleConfirmPasswordBlur,
        handleCloseAlert,
        handleSubmit,
      }}
    >
      {children}
    </SignUpContext.Provider>
  );
};
