// assets
import { 
  IconHome,   
  IconBuildingHospital,
  IconUser,
  IconCalendar,
  IconHeartbeat
} from '@tabler/icons-react';

// constant
const icons = {
  IconHome,
  IconBuildingHospital,
  IconUser,
  IconCalendar,
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
      icon: icons.IconHome,
      breadcrumbs: false
    },
    {
      id: 'specialties',
      title: 'Especialidades',
      type: 'item',
      url: '/specialties',
      icon: icons.IconHeartbeat,
      breadcrumbs: false
    },
    {
      id: 'doctors',
      title: 'Cubículos',
      type: 'item',
      url: '/cubicles',
      icon: icons.IconBuildingHospital,
      breadcrumbs: false
    },
    {
      id: 'doctors',
      title: 'Doctores',
      type: 'item',
      url: '/doctors',
      icon: icons.IconUser,
      breadcrumbs: false
    },
    {
      id: 'doctors',
      title: 'Horarios',
      type: 'item',
      url: '/schedules',
      icon: icons.IconCalendar,
      breadcrumbs: false
    },
    {
      id: 'doctors',
      title: 'Pacientes',
      type: 'item',
      url: '/schedules',
      icon: icons.IconUser,
      breadcrumbs: false
    }
  ]
};

export default utilities;
