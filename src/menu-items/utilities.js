// assets
import { 
  IconTypography,   
  IconClinicMedical,
  IconUserDoctor,
  IconCalendarEvent,
  IconHeartbeat
} from '@tabler/icons-react';

// constant
const icons = {
  IconTypography,
  IconClinicMedical,
  IconUserDoctor,
  IconCalendarEvent,
  IconHeartbeat
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'utilities',
  title: '',
  type: 'group',
  children: [
    {
      id: 'util-typography',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.IconTypography,
      breadcrumbs: false
    },
    {
      id: 'specialties',
      title: 'Especialidades',
      type: 'item',
      url: '/specialties',
      icon: icons.IconPalette,
      breadcrumbs: false
    },
    {
      id: 'doctors',
      title: 'Cubículos',
      type: 'item',
      url: '/cubicles',
      icon: icons.IconClinicMedical,
      breadcrumbs: false
    },
    {
      id: 'doctors',
      title: 'Doctores',
      type: 'item',
      url: '/doctors',
      icon: icons.IconUserDoctor,
      breadcrumbs: false
    },
    {
      id: 'doctors',
      title: 'Horarios',
      type: 'item',
      url: '/schedules',
      icon: icons.IconCalendarEvent,
      breadcrumbs: false
    },
    {
      id: 'doctors',
      title: 'Pacientes',
      type: 'item',
      url: '/schedules',
      icon: icons.IconHeartbeat,
      breadcrumbs: false
    }
  ]
};

export default utilities;
