import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
} from '@mui/material';

const LeadTable = ({ leads, onDragEnd, onEditLead }) => {
  const handleDragOver = (e) => e.preventDefault();
  const verificaStatus = (lead) => {
    if (lead.status === 'Cliente Potencial') {
      return 'left';
    } else if (lead.status === 'Dados Confirmados') {
      return 'center';
    }
    return 'right';
  };

  return (
    <TableContainer component={Paper} onDragOver={handleDragOver}>
      <Table
        sx={{ maxWidth: '900px', minWidth: '320px', width: '100%' }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell colSpan={3} align="center">
              Cliente Potencial
            </TableCell>
            <TableCell colSpan={3} align="center">
              Dados Confirmados
            </TableCell>
            <TableCell colSpan={3} align="center">
              Análise do Lead
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leads.map((lead) => (
            <TableRow key={lead.id}>
              <TableCell
                draggable
                colSpan={9}
                align={verificaStatus(lead)}
                onDragEnd={() => onDragEnd(lead)}
                onClick={() => onEditLead(lead)}
              >
                {lead.name}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LeadTable;
