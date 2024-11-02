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

import { getDoctorsRequest, deleteDoctorRequest } from 'services/doctor/doctorAPI';

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

const List = () => {
  const theme = useTheme();
  const navigate = useNavigate()
  const [doctors, setDoctors] = useState([]); 
  const [error, setError] = useState(null); 
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [open, setOpen] = useState(null);

  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [selectedDoctorName, setSelectedDoctorName] = useState('');
  const [selectedDoctorLastName, setSelectedDoctorLastName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);

  useEffect(() => {
      const getData = async () => {
          try {
              setIsLoading(true);
              const response = await getDoctorsRequest(); 
              setDoctors(response.data.Data);
          } catch (err) {
              setError(err.message); 
          } finally {
              setIsLoading(false);
          }
      };
      getData();
  }, []);

  const handleDetails = (id) => {
    navigate(`/doctors/show/${id}`);
  }

  const handleUpdate = (id) => {
    navigate(`/doctors/edit/${id}`);
};

const handleOpenDelete = (id, firstName, lastName) => {
  setSelectedDoctorId(`${id}`);
  setSelectedDoctorName(`${firstName}`);
  setSelectedDoctorLastName(`${lastName}`);
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
    const response = await deleteDoctorRequest(id);
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

  return (
      <>
 <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
                <Typography variant="h2" component="h1" sx={{ color: 'primary.main' }}>
                    Listado de doctores
                </Typography>
                <Stack direction="row" spacing={1}>
                    <Button
                        variant="contained"
                        startIcon={<Add />} 
                        sx={{ bg: 'primary.main', borderRadius: '20px' }}
                        onClick={() => navigate("/doctors/create")}
                    >
                        Registrar Doctor
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<DeleteOutline />}
                        sx={{ bg: 'primary.main', borderRadius: '20px' }} 
                        onClick={() => navigate("/doctors/trash")}
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
                              <TableCell>Nombre y apellido</TableCell>
                              <TableCell>Especialidad</TableCell>
                              <TableCell>Fecha de creación</TableCell>
                              <TableCell>Cédula de identidad</TableCell>
                              <TableCell>Acciones</TableCell>
                          </TableRow>
                      </TableHead>
                      <TableBody>
                          {doctors
                              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                              .map((doctor) => (
                                  <TableRow key={doctor.id}>
                                      <TableCell>{doctor.firstName} {doctor.lastName}</TableCell> 
                                      <TableCell>{doctor.Specialty.name}</TableCell> 
                                      <TableCell>{new Date(doctor.createdAt).toLocaleDateString()}</TableCell>
                                      <TableCell>{doctor.cedula}</TableCell> 
                                      <TableCell>
                                          <IconButton color="primary" aria-label="info" onClick={() => handleDetails(doctor.id)}>
                                              <Info />
                                          </IconButton>
                                          <IconButton color="primary" aria-label="editar" onClick={() => handleUpdate(doctor.id)}>
                                              <Edit />
                                          </IconButton>
                                          <IconButton color="primary" aria-label="eliminar" onClick={() => handleOpenDelete(doctor.id, doctor.firstName, doctor.lastName)}>
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
                      count={doctors.length}
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
            onActionClick={() => handleDelete(selectedDoctorId)} 
            title="Eliminar doctor"
            description="¿Está seguro que desea eliminar el doctor"
            name={`${selectedDoctorName} ${selectedDoctorLastName}`}
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

export default List;