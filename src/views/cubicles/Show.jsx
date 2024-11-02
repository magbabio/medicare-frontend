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
} from '@mui/material';
import { Delete, Edit, Add, DeleteOutline, Visibility, VisibilityOff } from '@mui/icons-material';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';

import DescriptionAlert from '../../utils/alert';
import LoadingBackdrop from '../../utils/loading';

import { valNumber, valDescription } from 'utils/validations/cubiclesSchema';

import { getCubicleRequest, createCubicleRequest, updateCubicleRequest } from '../../services/cubicle/cubicleAPI';

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
  const navigate = useNavigate();
  const params = useParams();

  const [cubicles, setCubicles] = useState([]); 
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState({});

  const { register, handleSubmit, watch, setValue, control } = useForm({
    defaultValues: {
      number: "",
      description: "",
    },
  });

  useEffect(() => {
    const loadCubicle = async () => {
      if (params.id) {
        try {
          setIsLoading(true); 
          const response = await getCubicleRequest(params.id);
          setValue('number', response.data.Data.number);
          setValue('description', response.data.Data.description);
        } catch (error) {
          const message = error.response.data.Message;
          setErrorMessage(message);
        } finally {
          setIsLoading(false); 
        }
      }
    };
  
    loadCubicle();
  }, [params.id, setValue]); 

  // Enviar formulario - Crear y Actualizar

  const onSubmit = handleSubmit(async (data) => {

    setErrorMessage('');
    setSuccessMessage(''); 
    
    const numberError = valNumber(data.number);
    const descriptionError = valDescription(data.description);

    if (
      numberError ||
      descriptionError 
    ) {
      setErrors({
        number: numberError, 
        description: descriptionError, 
      });
      return;
    }

    if (params.id) {
      try {
        setIsLoading(true);
        const response = await updateCubicleRequest(params.id,data);
        const responseData = response.data;
        const message = responseData.Message;
        setSuccessMessage(message);
        setTimeout(() => {
          navigate('/cubicles');
        }, 2000);
      } catch (error) {
        const message = error.response.data.Message;
        setErrorMessage(message);
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        const response = await createCubicleRequest(data);
        const responseData = response.data;
        const message = responseData.Message;
    
        setSuccessMessage(message);
  
        setTimeout(() => {
          navigate('/cubicles');
        }, 2000);
    
      } catch (error) {
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
        Detalles del cubículo
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
        <Stack spacing={2}>
            <Grid item xs={6} sm={6} md={6}>
            <Controller
                name="number"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    fullWidth
                    disabled
                    label="Número de cubículo"
                    id="number"
                    {...register("number")} 
                    error={!!errors.number} 
                    helperText={errors.number} 
                  />
                )}
              />
              </Grid>    
                <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    fullWidth
                    disabled
                    label="Descripción del cubículo"
                    id="description"
                    {...register("description")} 
                    error={!!errors.description} 
                    helperText={errors.description} 
                    multiline
                    rows={4}
                  />
                )}
              />                                                                                            
        </Stack>
    </MainCard>
    </form>
</>
  );
};

export default Form;