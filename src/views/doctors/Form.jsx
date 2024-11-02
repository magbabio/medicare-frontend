import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import {
    Grid,
    Typography,
    Button,
    Stack,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Divider
} from '@mui/material';
import { Delete, Edit, Add, DeleteOutline } from '@mui/icons-material';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';

import DescriptionAlert from '../../utils/alert';
import LoadingBackdrop from '../../utils/loading';

import { valName, valDescription } from '../../utils/validations/specialtySchema';

import { getSpecialtiesRequest } from '../../services/specialty/specialtyAPI';
import { getDoctorRequest, createDoctorRequest, updateDoctorRequest } from '../../services/doctor/doctorAPI';

const ColorBox = ({ bgcolor, title, data, dark }) => (
  <>
    <Card sx={{ mb: 3 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: 4.5,
          bgcolor,
          color: dark ? 'grey.800' : '#ffffff'
        }}
      >
        {title && (
          <Typography variant="subtitle1" color="inherit">
            {title}
          </Typography>
        )}
        {!title && <Box sx={{ p: 1.15 }} />}
      </Box>
    </Card>
    {data && (
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="subtitle2">{data.label}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1" sx={{ textTransform: 'uppercase' }}>
            {data.color}
          </Typography>
        </Grid>
      </Grid>
    )}
  </>
);

ColorBox.propTypes = {
  bgcolor: PropTypes.string,
  title: PropTypes.string,
  data: PropTypes.object.isRequired,
  dark: PropTypes.bool
};


const Form = () => {
  const theme = useTheme();
  const [specialties, setSpecialties] = useState([]); 

  const navigate = useNavigate();

  const params = useParams();

  const { register, handleSubmit, setValue, control } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      specialtyId: "",
      phone: "",
      cedula: "",
      birthday: "",
      gender: "",
      perfil: "",
      email: "",
      password: ""
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const loadDoctor = async () => {
      if (params.id) {
        try {
          setIsLoading(true); 
          const response = await getDoctorRequest(params.id);
          setValue('firstName', response.data.Data.firstName);
          setValue('lastName', response.data.Data.lastName);
          setValue('specialtyId', response.data.Data.specialtyId);
          setValue('phone', response.data.Data.phone);
          setValue('cedula', response.data.Data.cedula);
          setValue('birthday', response.data.Data.birthday);
          setValue('gender', response.data.Data.gender);
          setValue('perfil', response.data.Data.perfil);
        } catch (error) {
          const message = error.response.data.Message;
          setErrorMessage(message);
        } finally {
          setIsLoading(false); 
        }
      }
    };
  
    loadDoctor();
  }, [params.id, setValue]); 

  // Traer especialidades

  useEffect(() => {
    const getSpecialties = async () => {
      try {
        setIsLoading(true); 
        const response = await getSpecialtiesRequest();
        setSpecialties(response.data.Data);
      } catch (error) {
        const message = error.response.data.Message;
        setErrorMessage(message);
      } finally {
        setIsLoading(false); 
      }
    };

    getSpecialties();
  }, []);

  const onSubmit = handleSubmit(async (data) => {

    setErrorMessage('');
    setSuccessMessage(''); 
    
    const nameError = valName(data.name);
    const descriptionError = valDescription(data.description);

    if (
      nameError ||
      descriptionError
    ) {
      setErrors({
        name: nameError,
        description: descriptionError,
      });
      return;
    }

    if (params.id) {
      try {
        setIsLoading(true);
        const response = await updateDoctorRequest(params.id,data);
        const responseData = response.data;
        const message = responseData.Message;
        setSuccessMessage(message);
        setTimeout(() => {
          navigate('/doctors');
        }, 2000);
      } catch (error) {
        const message = error.response.data.Message;
        setErrorMessage(message);
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        const response = await createDoctorRequest(data);
        console.log('holaaa',response);
        console.log('holaaaa',data);
        const responseData = response.data;
        const message = responseData.Message;
    
        setSuccessMessage(message);
  
        setTimeout(() => {
          navigate('/doctors');
        }, 2000);
    
      } catch (error) {
        console.log(error);
        const message = error.response.data.Message;
        setErrorMessage(message);
      } finally {
        setIsLoading(false);
      }
    }
  });

  return (
    <>
    <form onSubmit={onSubmit} > 
    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
                <Typography variant="h2" component="h2" sx={{ color: '#2862f5' }}>
                  {params.id ? "Editar doctor" : "Registrar doctor"}
                </Typography>
    </Stack>  
    {successMessage && (
        <DescriptionAlert severity="success" title="Éxito" description={successMessage} />
      )}
      {errorMessage && (
        <DescriptionAlert severity="error" title="Error" description={errorMessage} />
      )}
      <LoadingBackdrop isLoading={isLoading} />
    <MainCard sx={{ padding: 3, mb: 2 }}> {/* Añade margen inferior */}
        <Typography variant="h4" component="h4" sx={{ mb: 2, color: theme.palette.text.primary }}>
            Detalles del doctor
        </Typography>
        
        <Stack spacing={2}>
            <Grid item xs={6} sm={6} md={6}>
            <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    fullWidth
                    label="Nombre"
                    id="firstName"
                    {...register("firstName")} 
                    error={!!errors.firstName} 
                    helperText={errors.firstName} 
                  />
                )}
              />
              </Grid>
              <Grid item xs={6} sm={6} md={6}>
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    fullWidth
                    label="Apellido"
                    id="lastName"
                    {...register("lastName")} 
                    error={!!errors.lastName} 
                    helperText={errors.lastName} 
                  />
                )}
              />
              </Grid>
              <FormControl fullWidth required>
              <InputLabel>Seleccione especialidad</InputLabel>
              <Controller
                control={control}
                name="specialtyId"
                render={({ field }) => (
                    <Select
                    {...field}
                    id="specialtyId"
                    label="Seleccione especialidad"
                    fullWidth
                    >
                    {specialties.map((specialty) => (
                        <MenuItem key={specialty.id} value={specialty.id}>
                        {specialty.name}
                        </MenuItem>
                    ))}
                    </Select>
                )}
                />
                </FormControl>
                <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    fullWidth
                    label="Teléfono"
                    id="phone"
                    {...register("phone")} 
                    error={!!errors.phone} 
                    helperText={errors.phone} 
                  />
                )}
                />    
                <Controller
                name="cedula"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    fullWidth
                    label="Cedula"
                    id="cedula"
                    {...register("cedula")} 
                    error={!!errors.cedula} 
                    helperText={errors.cedula} 
                  />
                )}
                />
                <FormControl fullWidth required>
                <InputLabel>Género</InputLabel>
                <Controller
                    control={control}
                    name="gender"
                    render={({ field }) => (
                    <Select
                        {...field}
                        id="gender"
                        label="Género"
                    >
                        <MenuItem value="F">Femenino</MenuItem>
                        <MenuItem value="M">Masculino</MenuItem>
                    </Select>
                    )}
                />
                </FormControl>
                <Controller
                name="perfil"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    fullWidth
                    label="Perfil"
                    id="perfil"
                    {...register("perfil")} 
                    error={!!errors.perfil} 
                    helperText={errors.perfil} 
                    multiline
                    rows={4}
                  />
                )}
              />            
              <Divider/>     
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    fullWidth
                    label="Correo electrónico"
                    id="email"
                    {...register("email")} 
                    error={!!errors.email} 
                    helperText={errors.email} 
                  />
                )}
              /> 
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    fullWidth
                    label="Contraseña"
                    id="password"
                    {...register("password")} 
                    error={!!errors.password} 
                    helperText={errors.password} 
                  />
                )}
              />                                                                  
        </Stack>
    </MainCard>

    <Stack direction="row" justifyContent="flex-end" sx={{ pr: 1 }}>
        <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            sx={{
                borderRadius: '20px',
                mt: 1, 
            }}
            type="submit"
        >
            {params.id ? "Editar doctor" : "Registrar doctor"}
        </Button>
    </Stack>
    </form>
</>
  );
};

export default Form;