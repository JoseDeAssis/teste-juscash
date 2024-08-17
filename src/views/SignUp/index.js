import {
  Alert,
  Box,
  Button,
  Card,
  CardMedia,
  FormControl,
  IconButton,
  InputAdornment,
  Link,
  Snackbar,
  TextField,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import CardContent from '@mui/material/CardContent';
import { useSignUp } from '../../hooks/SignUpContext';

const SignUp = () => {
  const {
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
  } = useSignUp();

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
        <Card
          variant="outlined"
          sx={{
            maxWidth: '700px',
            minWidth: '320px',
            width: '100%',
          }}
        >
          <CardMedia
            component="img"
            sx={{ padding: '1em', boxSizing: 'border-box' }}
            image="https://www.juscash.com.br/wp-content/themes/s3/assets/img/logo-white.svg"
            alt="logo juscash"
          />
          <CardContent>
            <form onSubmit={handleSubmit}>
              <FormControl fullWidth sx={{ mb: '1em' }}>
                <TextField
                  required
                  id="outlined-nome"
                  type="text"
                  label="Nome completo"
                  name="nomeCompleto"
                  value={formData.nomeCompleto}
                  onChange={handleInputChange}
                  onBlur={handleNomeCompletoBlur}
                  error={!!errors.nomeCompleto}
                  helperText={errors.nomeCompleto}
                />
              </FormControl>
              <FormControl fullWidth sx={{ mb: '1em' }}>
                <TextField
                  required
                  id="outlined-email"
                  type="text"
                  label="E-mail"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleEmailBlur}
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </FormControl>
              <FormControl fullWidth sx={{ mb: '1em' }}>
                <TextField
                  required
                  id="outlined-adornment-senha"
                  type={showPassword ? 'text' : 'password'}
                  label="Senha"
                  error={!!errors.password}
                  helperText={errors.password}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onBlur={handlePasswordBlur}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={(event) => event.preventDefault()}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
              <FormControl fullWidth sx={{ mb: '1em' }}>
                <TextField
                  required
                  id="outlined-adornment-confirmar-senha"
                  type={showConfirmPassword ? 'text' : 'password'}
                  label="Confirmar senha"
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  onBlur={handleConfirmPasswordBlur}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={(event) => event.preventDefault()}
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
              <Box
                sx={{
                  typography: 'body1',
                  '& > :not(style) ~ :not(style)': {
                    ml: 2,
                  },
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginTop: '1em',
                }}
              >
                <Link component={RouterLink} to="/login" underline="none">
                  Já possui conta? Fazer o login
                </Link>
              </Box>
              <Button
                variant="contained"
                color="success"
                sx={{ marginTop: '2em', width: '25%' }}
                type="submit"
              >
                Criar conta
              </Button>
            </form>
          </CardContent>
        </Card>
        <Snackbar
          open={alert.open}
          autoHideDuration={6000}
          onClose={handleCloseAlert}
        >
          <Alert severity={alert.severity}>{alert.message}</Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default SignUp;
