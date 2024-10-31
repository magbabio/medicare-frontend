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

import { getDeletedSpecialtiesRequest } from '../../services/specialty/specialtyAPI';

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

const Trash = () => {
  const theme = useTheme();
  const navigate = useNavigate()
  const [specialties, setSpecialties] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
      const getData = async () => {
          try {
              setLoading(true);
              const response = await getDeletedSpecialtiesRequest(); 
              console.log("Response:", response);
              setSpecialties(response.data.Data); // Accede a la propiedad correcta
              console.log("Specialties Array:", response.data.Data); // Para depurar
          } catch (err) {
              setError(err.message); 
          } finally {
              setLoading(false);
          }
      };
      getData();
  }, []);

  const handleUpdate = (id) => {
    navigate(`/specialties/edit/${id}`);
};

  const handleChangePage = (event, newPage) => {
      setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0); // Regresar a la primera página cuando cambie el número de filas por página
  };

  if (loading) {
      return <Typography variant="h6">Cargando...</Typography>; 
  }

  if (error) {
      return <Typography variant="h6" color="error">Error: {error}</Typography>; 
  }

  if (!Array.isArray(specialties) || specialties.length === 0) {
      return <Typography variant="h6">No se encontraron especialidades.</Typography>; 
  }

  return (
      <>
 <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
                <Typography variant="h4" component="h2" sx={{ color: 'blue' }}>
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
                              <TableCell>Fecha de Eliminación</TableCell>
                              <TableCell>Acciones</TableCell>
                          </TableRow>
                      </TableHead>
                      <TableBody>
                          {specialties
                              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                              .map((specialty) => (
                                  <TableRow key={specialty.id}>
                                      <TableCell>{specialty.name}</TableCell> {/* Asegúrate de que esto coincida */}
                                      <TableCell>{new Date(specialty.deletedAt).toLocaleDateString()}</TableCell> {/* Formato de fecha */}
                                      <TableCell>
                                          <IconButton color="primary" aria-label="info">
                                              <Info />
                                          </IconButton>
                                          <IconButton color="primary" aria-label="editar" onClick={() => handleUpdate(specialty.id)}>
                                              <Edit />
                                          </IconButton>
                                          <IconButton color="secondary" aria-label="eliminar">
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
      </>
  );
};

export default Trash;