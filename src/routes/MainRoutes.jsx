import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

import ProtectedRoute from './ProtectedRoute';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const SpecialtiesForm = Loadable(lazy(() => import('views/utilities/Form')));
const SpecialtiesShow = Loadable(lazy(() => import('views/utilities/Show')));
const SpecialtiesTrash = Loadable(lazy(() => import('views/utilities/Trash')));
const CubiclesList = Loadable(lazy(() => import('views/cubicles/List')));
const CubiclesForm = Loadable(lazy(() => import('views/cubicles/Form')));
const DoctorsList = Loadable(lazy(() => import('views/doctors/List')));
const DoctorsForm = Loadable(lazy(() => import('views/doctors/Form')));
const PatientsList = Loadable(lazy(() => import('views/patients/List')));
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <ProtectedRoute element={<DashboardDefault />} allowedRoles={['admin']} />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <ProtectedRoute element={<DashboardDefault />} allowedRoles={['admin']} />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-typography',
          element: <ProtectedRoute element={<UtilsTypography />} allowedRoles={['admin']} />
        }
      ]
    },
    {
      path: 'specialties',
      element: <ProtectedRoute element={<UtilsColor />} allowedRoles={['admin']} />
    },
    {
      path: 'specialties/create',
      element: <ProtectedRoute element={<SpecialtiesForm />} allowedRoles={['admin']} />
    },
    {
      path: 'specialties/show/:id',
      element: <ProtectedRoute element={<SpecialtiesShow />} allowedRoles={['admin']} />
    },
    {
      path: 'cubicles',
      element: <ProtectedRoute element={<CubiclesList />} allowedRoles={['admin']} />
    },
    {
      path: 'doctors',
      element: <ProtectedRoute element={<DoctorsList />} allowedRoles={['admin']} />
    },
    {
      path: 'patients',
      element: <ProtectedRoute element={<PatientsList />} allowedRoles={['admin']} />
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    }
  ]
};

export default MainRoutes;
