import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
} from '@mui/material';
import { Info, Delete, Edit, Add, DeleteOutline } from '@mui/icons-material';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';

import DescriptionAlert from 'utils/alert';
import LoadingBackdrop from 'utils/loading';

import AlertDialog from 'ui-component/AlertDialog';

import { getSpecialtiesRequest, deleteSpecialtyRequest } from '../../services/specialty/specialtyAPI';

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

const UIColor = () => {
  const theme = useTheme();
  const navigate = useNavigate()
  const [specialties, setSpecialties] = useState([]); 
  const [error, setError] = useState(null); 
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [open, setOpen] = useState(null);

  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState('');
  const [selectedSpecialtyName, setSelectedSpecialtyName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);

  useEffect(() => {
      const getData = async () => {
          try {
              setIsLoading(true);
              const response = await getSpecialtiesRequest(); 
              console.log("Response:", response);
              setSpecialties(response.data.Data); // Accede a la propiedad correcta
              console.log("Specialties Array:", response.data.Data); // Para depurar
          } catch (err) {
              setError(err.message); 
          } finally {
              setIsLoading(false);
          }
      };
      getData();
  }, []);

  const handleDetails = (id) => {
    navigate(`/specialties/show/${id}`);
  }

  const handleUpdate = (id) => {
    navigate(`/specialties/edit/${id}`);
};

const handleOpenDelete = (id, name) => {
  setSelectedSpecialtyId(`${id}`);
  setSelectedSpecialtyName(`${name}`);
  setOpenAlertDialog(true);
}

const handleOpenMenu = (event) => {
  setOpen(event.currentTarget);
};

const handleCloseMenu = () => {
  setOpen(null);
};

const handleDelete = async (id) => {
  try {
    setOpenAlertDialog(false); 
    handleCloseMenu();
    setIsLoading(true);
    const response = await deleteSpecialtyRequest(id);
    const message = response.data.Message;
    setSuccessMessage(message);
  } catch (error) {
    const message = error.response.data.Message;
    setErrorMessage(message);
  } finally {
    setIsLoading(false);
  }
  setTimeout(() => {
    window.location.reload();
  }, 1000);  
}


  const handleChangePage = (event, newPage) => {
      setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0); // Regresar a la primera página cuando cambie el número de filas por página
  };


  if (error) {
      return <Typography variant="h6" color="error">Error: {error}</Typography>; 
  }

  if (!Array.isArray(specialties) || specialties.length === 0) {
      return <Typography variant="h6">No se encontraron especialidades.</Typography>; 
  }

  return (
      <>
 <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
                <Typography variant="h4" component="h2" sx={{ color: 'primary.main' }}>
                    Listado de especialidades ofrecidas
                </Typography>
                <Stack direction="row" spacing={1}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Add />} // Icono para "Registrar Especialidad"
                        sx={{ borderRadius: '20px' }} // Bordes redondeados
                        onClick={() => navigate("/specialties/create")}
                    >
                        Registrar Especialidad
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<DeleteOutline />} // Icono para "Papelera"
                        sx={{ borderRadius: '20px' }} // Bordes redondeados
                        onClick={() => navigate("/specialties/trash")}
                    >
                        Papelera
                    </Button>
                </Stack>
            </Stack>      
          <MainCard>
              <TableContainer component={Paper}>
                  <Table>
                      <TableHead>
                          <TableRow>
                              <TableCell>Nombre de Especialidad</TableCell>
                              <TableCell>Fecha de Creación</TableCell>
                              <TableCell>Acciones</TableCell>
                          </TableRow>
                      </TableHead>
                      <TableBody>
                          {specialties
                              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                              .map((specialty) => (
                                  <TableRow key={specialty.id}>
                                      <TableCell>{specialty.name}</TableCell> {/* Asegúrate de que esto coincida */}
                                      <TableCell>{new Date(specialty.createdAt).toLocaleDateString()}</TableCell> {/* Formato de fecha */}
                                      <TableCell>
                                          <IconButton color="primary" aria-label="info" onClick={() => handleDetails(specialty.id)}>
                                              <Info />
                                          </IconButton>
                                          <IconButton color="primary" aria-label="editar" onClick={() => handleUpdate(specialty.id)}>
                                              <Edit />
                                          </IconButton>
                                          <IconButton color="secondary" aria-label="eliminar" onClick={() => handleOpenDelete(specialty.id, specialty.name)}>
                                              <Delete />
                                          </IconButton>
                                      </TableCell>
                                  </TableRow>
                              ))}
                      </TableBody>
                  </Table>
                  <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      component="div"
                      count={specialties.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                  />
              </TableContainer>
          </MainCard>
          <AlertDialog 
            openAlertDialog={openAlertDialog} 
            onClose={() => setOpenAlertDialog(false)} 
            onActionClick={() => handleDelete(selectedSpecialtyId)} 
            title="Eliminar especialidad"
            description="¿Está seguro que desea eliminar la especialidad?"
            name={selectedSpecialtyName}
            action="Eliminar"                  
          />
      {successMessage && (
        <DescriptionAlert severity="success" title="Éxito" description={successMessage} />
      )}
      {errorMessage && (
        <DescriptionAlert severity="error" title="Error" description={errorMessage} />
      )}
      <LoadingBackdrop isLoading={isLoading} /> 
      </>
  );
};

export default UIColor;