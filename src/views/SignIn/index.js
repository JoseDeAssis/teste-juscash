import {
  Box,
  Button,
  Card,
  CardMedia,
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
  Link,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import CardContent from '@mui/material/CardContent';
import { useSignIn } from '../../hooks/SignInContext';

const SignIn = () => {
  const {
    showPassword,
    formData,
    errors,
    handleClickShowPassword,
    handleInputChange,
    handleEmailBlur,
    handlePasswordBlur,
    handleSubmit,
  } = useSignIn();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        p: 2,
      }}
    >
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
                id="my-input"
                aria-describedby="my-helper-text"
                label="E-mail"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleEmailBlur}
                error={!!errors.email}
                helperText={errors.email}
                sx={{ width: '100%' }}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mb: '1em' }}>
              <TextField
                required
                id="outlined-adornment-senha"
                type={showPassword ? 'text' : 'password'}
                label="Senha"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                onBlur={handlePasswordBlur}
                error={!!errors.password}
                helperText={errors.password}
                sx={{ width: '100%' }}
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
              <Link component={RouterLink} to="/" underline="none">
                Não possui conta? Fazer o cadastro
              </Link>
            </Box>
            <Button
              variant="contained"
              color="success"
              sx={{ marginTop: '2em' }}
              type="submit"
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SignIn;
