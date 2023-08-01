import HomeIcon from '@mui/icons-material/Home';

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
      icon: HomeIcon,
      breadcrumbs: false,
    },
  ],
};

export default dashboard;
