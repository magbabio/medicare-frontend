// assets
import { IconDashboard } from '@tabler/icons-react';

// constant
const icons = { IconDashboard };

// ==============================|| SPECIALTIES MENU ITEMS ||============================== //

const specialties = {
  id: 'specialties',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Especialidades',
      type: 'item',
      url: '/specialties',
      icon: icons.IconDashboard,
      breadcrumbs: false
    }
  ]
};

export default specialties;
