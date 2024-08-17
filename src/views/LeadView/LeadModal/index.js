import React from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
  FormControl,
  Grid,
} from '@mui/material';
import { useLeads } from '../../../hooks/LeadsContext';

const LeadModal = () => {
  const {
    lead,
    handleInputChange,
    handleSaveLead,
    opportunities,
    errors,
    setOpenModal,
    handleNameBlur,
    handleEmailBlur,
    handleTelefoneBlur,
    handleToggleAll,
    handleToggleOpportunity,
  } = useLeads();

  return (
    <Dialog open fullWidth onClose={() => setOpenModal(false)}>
      <DialogContent>
        <Typography variant="h4" sx={{ mb: '1em' }}>
          {!!lead.id ? 'Lead' : 'Novo Lead'}
        </Typography>
        <Box component="form">
          <Typography variant="h6">Dados do Lead</Typography>
          <FormControl fullWidth>
            <TextField
              required
              id="modal-nome-completo"
              label="Nome completo"
              name="name"
              value={lead.name}
              onChange={handleInputChange}
              disabled={!!lead.id}
              onBlur={handleNameBlur}
              error={!!errors.name}
              helperText={errors.name}
              margin="normal"
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              required
              id="modal-email"
              label="E-mail"
              name="email"
              value={lead.email}
              onChange={handleInputChange}
              disabled={!!lead.id}
              onBlur={handleEmailBlur}
              error={!!errors.email}
              helperText={errors.email}
              margin="normal"
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              required
              id="modal-telefone"
              label="Telefone"
              name="telefone"
              value={lead.telefone}
              onChange={handleInputChange}
              disabled={!!lead.id}
              onBlur={handleTelefoneBlur}
              error={!!errors.telefone}
              helperText={errors.telefone}
              margin="normal"
            />
          </FormControl>
          <Box>
            <Typography variant="h6" sx={{ mb: '1em' }}>
              Oportunidades
            </Typography>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={opportunities.every((op) => op.selected)}
                    onChange={handleToggleAll}
                    disabled={!!lead.id}
                  />
                }
                label="Todos"
              />
            </Grid>
            {opportunities.map((op, index) => (
              <Grid item xs={12} key={index}>
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={op.selected}
                      onChange={() => handleToggleOpportunity(index)}
                      disabled={!!lead.id}
                    />
                  }
                  label={op.name}
                />
              </Grid>
            ))}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => setOpenModal(false)}
          variant="outlined"
          color="primary"
        >
          Cancelar
        </Button>
        <Button
          onClick={handleSaveLead}
          variant="contained"
          color="primary"
          disabled={!!lead.id}
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LeadModal;
