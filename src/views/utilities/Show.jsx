import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    TablePagination,
    Grid,
    Typography,
    Button,
    Stack,
    TextField
} from '@mui/material';
import { Delete, Edit, Add, DeleteOutline } from '@mui/icons-material';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';

import DescriptionAlert from '../../utils/alert';
import LoadingBackdrop from '../../utils/loading';

import { valName, valDescription } from '../../utils/validations/specialtySchema';

import { getSpecialtyRequest, updateSpecialtyRequest, createSpecialtyRequest } from '../../services/specialty/specialtyAPI';



// ===============================|| COLOR BOX ||=============================== //

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

// ===============================|| UI COLOR ||=============================== //


const Show = () => {
  const theme = useTheme();
  const [specialties, setSpecialties] = useState([]); 

  const navigate = useNavigate();

  const params = useParams();

  const { register, handleSubmit, setValue, control } = useForm({
    defaultValues: {
      name: "",
      description: ""
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const loadSpecialty = async () => {
      if (params.id) {
        try {
          setIsLoading(true); 
          const response = await getSpecialtyRequest(params.id);
          console.log(response);
          setValue('name', response.data.Data.name);
          setValue('description', response.data.Data.description);
        } catch (error) {
          const message = error.response.data.Message;
          setErrorMessage(message);
        } finally {
          setIsLoading(false); 
        }
      }
    };
  
    loadSpecialty();
  }, [params.id, setValue]); 

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
        const response = await updateSpecialtyRequest(params.id,data);
        const responseData = response.data;
        const message = responseData.Message;
        setSuccessMessage(message);
        setTimeout(() => {
          navigate('/specialties');
        }, 2000);
      } catch (error) {
        const message = error.response.data.Message;
        setErrorMessage(message);
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        const response = await createSpecialtyRequest(data);
        const responseData = response.data;
        const message = responseData.Message;
    
        setSuccessMessage(message);
  
        setTimeout(() => {
          navigate('/specialties');
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
                <Typography variant="h4" component="h2" sx={{ color: 'blue' }}>
                  {params.id ? "Editar especialidad" : "Registrar especialidad"}
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
        <Typography variant="h5" component="h3" sx={{ mb: 2, color: theme.palette.text.primary }}>
            Detalles de la especialidad
        </Typography>
        
        <Stack spacing={2}>
            <Controller
                name="name"
                control={control}
                defaultValue="" // Agrega un valor por defecto para el campo de nombre
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    fullWidth
                    label="Nombre de la especialidad"
                    id="name"
                    {...register("name")} 
                    error={!!errors.name} 
                    helperText={errors.name} 
                  />
                )}
              />
              <Controller
                name="description"
                control={control}
                defaultValue="" // Agrega un valor por defecto para el campo de nombre
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    fullWidth
                    label="Descripción de la especialidad"
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

    {/* Botón de "Registrar Especialidad" posicionado a la derecha */}
    <Stack direction="row" justifyContent="flex-end" sx={{ pr: 1 }}>
        <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            sx={{
                borderRadius: '20px',
                mt: 1, // Margen superior
            }}
            type="submit"
        >
            {params.id ? "Editar especialidad" : "Registrar especialidad"}
        </Button>
    </Stack>
    </form>
</>
  );
};

export default Show;