import DashboardIcon from '@mui/icons-material/Dashboard';

const dashboard = {
  id: 'home',
  // title: 'Home',
  type: 'group',
  children: [
    {
      id: 'home',
      title: 'Home',
      type: 'item',
      url: '/home',
      icon: DashboardIcon,
      breadcrumbs: false,
    },
  ],
};

export default dashboard;
