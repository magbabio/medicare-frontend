import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
  Typography,
  FormHelperText
} from '@mui/material';

import { useAuth } from 'context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { handleLogin } = useAuth();
  const { register, handleSubmit, formState: { errors }, setError } = useForm();

  const onSubmit = async (data) => {
    try {
      await handleLogin(data);
      navigate('/dashboard/default'); // Redirige a la página del dashboard o donde sea necesario
    } catch (error) {
      setError("email", {
        type: "manual",
        message: error.message || "Error en el inicio de sesión."
      });
    }
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ height: '100vh' }}
    >
      <Box mb={4}>
        <Typography variant="h4" style={{ color: 'blue' }}>
          Bienvenidos
        </Typography>
      </Box>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '300px' }}>
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel htmlFor="email">Email</InputLabel>
          <OutlinedInput
            id="email"
            type="email"
            {...register("email", { required: "Email es requerido." })}
            label="Email"
            error={!!errors.email}
          />
          {errors.email && (
            <FormHelperText error>{errors.email.message}</FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel htmlFor="password">Contraseña</InputLabel>
          <OutlinedInput
            id="password"
            type="password"
            {...register("password", { required: "Contraseña es requerida." })}
            label="Contraseña"
            error={!!errors.password}
          />
          {errors.password && (
            <FormHelperText error>{errors.password.message}</FormHelperText>
          )}
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            borderRadius: '20px',
            mt: 3,
            backgroundColor: 'blue',
            '&:hover': {
              backgroundColor: 'darkblue',
            },
          }}
          fullWidth
        >
          Iniciar sesión
        </Button>
      </Box>
    </Grid>
  );
};

export default Login;
