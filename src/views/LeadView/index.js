import {
  Box,
  Grid,
  Button,
  Modal,
  CardMedia,
  Snackbar,
  Alert,
} from '@mui/material';
import LeadTable from './LeadTable';
import { useLeads } from '../../hooks/LeadsContext';
import LeadModal from './LeadModal';

const LeadView = () => {
  const {
    leads,
    alert,
    openModal,
    handleDragEnd,
    handleNewLead,
    handleEditLead,
    handleCloseAlert,
  } = useLeads();

  return (
    <Box
      sx={{
        padding: 4,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        maxWidth: '900px',
        minWidth: '320px',
        width: '100%',
        margin: '0 auto',
      }}
    >
      <CardMedia
        component="img"
        sx={{ padding: '1em', boxSizing: 'border-box', maxWidth: 900 }}
        image="https://www.juscash.com.br/wp-content/themes/s3/assets/img/logo-white.svg"
        alt="logo juscash"
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleNewLead}
        sx={{ alignSelf: 'flex-end', marginBottom: 2 }}
      >
        Novo Lead
      </Button>
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        <Grid item xs={12}>
          <LeadTable
            leads={leads}
            onDragEnd={handleDragEnd}
            onEditLead={handleEditLead}
          />
        </Grid>
      </Grid>

      <Modal open={openModal}>
        <LeadModal />
      </Modal>
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert severity={alert.severity}>{alert.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default LeadView;
