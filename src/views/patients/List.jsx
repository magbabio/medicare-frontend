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

import { getPatientsRequest } from 'services/patient/patientAPI';

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

const List = () => {
  const theme = useTheme();
  const navigate = useNavigate()
  const [patients, setPatients] = useState([]); 
  const [error, setError] = useState(null); 
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [open, setOpen] = useState(null);

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);

  useEffect(() => {
      const getData = async () => {
          try {
              setIsLoading(true);
              const response = await getPatientsRequest(); 
              setPatients(response.data.Data);
          } catch (err) {
              setError(err.message); 
          } finally {
              setIsLoading(false);
          }
      };
      getData();
  }, []);

  const handleDetails = (id) => {
    navigate(`/patients/show/${id}`);
  }


const handleOpenMenu = (event) => {
  setOpen(event.currentTarget);
};

const handleCloseMenu = () => {
  setOpen(null);
};

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
                    Listado de pacientes
                </Typography>
            </Stack>      
          <MainCard>
              <TableContainer component={Paper}>
                  <Table>
                      <TableHead>
                          <TableRow>
                              <TableCell>Nombre y apellido</TableCell>
                              <TableCell>Correo electrónico</TableCell>
                              <TableCell>Fecha de creación</TableCell>
                              <TableCell>Cédula de identidad</TableCell>
                              <TableCell>Acciones</TableCell>
                          </TableRow>
                      </TableHead>
                      <TableBody>
                          {patients
                              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                              .map((patient) => (
                                  <TableRow key={patient.id}>
                                      <TableCell>{patient.firstName} {patient.lastName}</TableCell> 
                                      <TableCell>{patient.User.email}</TableCell> 
                                      <TableCell>{new Date(patient.createdAt).toLocaleDateString()}</TableCell>
                                      <TableCell>{patient.cedula}</TableCell> 
                                      <TableCell>
                                          <IconButton color="primary" aria-label="info" onClick={() => handleDetails(doctor.id)}>
                                              <Info />
                                          </IconButton>
                                      </TableCell>
                                  </TableRow>
                              ))}
                      </TableBody>
                  </Table>
                  <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      component="div"
                      count={patients.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                  />
              </TableContainer>
          </MainCard>
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