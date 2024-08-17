import React, { createContext, useContext, useState } from 'react';
import LeadsService from '../services/LeadsService';
import {
  validateEmail,
  validateFullName,
  validatePhoneNumber,
} from '../services/ValidationService';

const LeadsContext = createContext();

export const useLeads = () => useContext(LeadsContext);

export const LeadsProvider = ({ children }) => {
  const [leads, setLeads] = useState(LeadsService.getLeads());
  const [openModal, setOpenModal] = useState(false);
  const initialLeadState = { name: '', email: '', telefone: '' };
  const initialErrorsState = { name: '', email: '', telefone: '' };
  const initialOpportunitiesState = [
    { name: 'Horários Sucumbenciais', selected: true },
    { name: 'Horários Contratuais', selected: true },
    { name: 'Horários Dativos', selected: true },
    { name: 'Crédito do Autor', selected: true },
  ];
  const [lead, setLead] = useState(initialLeadState);
  const [opportunities, setOpportunities] = useState(initialOpportunitiesState);
  const [errors, setErrors] = useState(initialErrorsState);
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'error',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLead({
      ...lead,
      [name]: value,
    });
  };

  const handleNewLead = () => {
    setLead(initialLeadState);
    setErrors(initialErrorsState);
    setOpportunities(initialOpportunitiesState);
    setOpenModal(true);
  };

  const setError = (field, message) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: message,
    }));
  };

  const handleEditLead = (lead) => {
    setLead(lead);
    setOpenModal(true);
  };

  const handleSaveLead = () => {
    try {
      LeadsService.saveLead(lead, opportunities);
      setLeads(LeadsService.getLeads());
      setAlert({
        open: true,
        message: 'Lead incluído com sucesso!',
        severity: 'success',
      });
    } catch (error) {
      setAlert({
        open: true,
        message: 'Erro ao incluir o lead',
        severity: 'error',
      });
    }
    setOpenModal(false);
  };

  const handleDragEnd = (lead) => {
    const nextStatus = getNextStatus(lead.status);
    if (nextStatus) {
      LeadsService.updateLeadStatus(lead, nextStatus);
      setLeads(LeadsService.getLeads());
    }
  };

  const handleNameBlur = () => {
    if (!validateFullName(lead.name)) {
      setError('name', 'Nome deve ter mais de 3 caracters.');
    } else {
      setError('name', '');
    }
  };

  const handleEmailBlur = () => {
    if (!validateEmail(lead.email)) {
      setError('email', 'Email inválido.');
    } else {
      setError('email', '');
    }
  };

  const handleTelefoneBlur = () => {
    if (!validatePhoneNumber(lead.telefone)) {
      setError('telefone', 'Telefone deve estar no formato (XX)XXXXX-XXXX.');
    } else {
      setError('telefone', '');
    }
  };

  const getNextStatus = (currentStatus) => {
    if (currentStatus === 'Cliente Potencial') return 'Dados Confirmados';
    if (currentStatus === 'Dados Confirmados') return 'Análise do Lead';
    return null;
  };

  const handleToggleAll = () => {
    const allSelected = opportunities.every((op) => op.selected);
    setOpportunities(
      opportunities.map((op) => ({ ...op, selected: !allSelected }))
    );
  };

  const handleToggleOpportunity = (index) => {
    const updated = opportunities.map((op, i) =>
      i === index ? { ...op, selected: !op.selected } : op
    );
    setOpportunities(updated);
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <LeadsContext.Provider
      value={{
        leads,
        lead,
        openModal,
        opportunities,
        errors,
        alert,
        handleNameBlur,
        handleEmailBlur,
        handleTelefoneBlur,
        setOpenModal,
        handleNewLead,
        handleEditLead,
        handleSaveLead,
        handleDragEnd,
        setOpportunities,
        handleInputChange,
        handleToggleAll,
        handleToggleOpportunity,
        handleCloseAlert,
      }}
    >
      {children}
    </LeadsContext.Provider>
  );
};
