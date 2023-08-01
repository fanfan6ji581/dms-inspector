import CountryFlag from '../ui-component/CountryFlag';

// constant
const icons = {
  FlagMY: <CountryFlag countryCode="MY" />,
  FlagID: <CountryFlag countryCode="ID" />,
  FlagIN: <CountryFlag countryCode="IN" />,
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'pages',
  type: 'group',
  children: [
    {
      id: 'malaysia',
      title: 'Malaysia',
      type: 'collapse',
      icon: icons.FlagMY,
      children: [
        {
          id: 'all-requests',
          title: 'All Requests',
          type: 'item',
          url: '/malaysia/requests',
        },
      ],
    },
    {
      id: 'indonesia',
      title: 'Indonesia',
      type: 'collapse',
      icon: icons.FlagID,
      children: [
        {
          id: 'id',
          title: 'Coming soon',
          type: 'item',
          url: '/indonesia',
          // target: true
        },
      ],
    },
    {
      id: 'india',
      title: 'India',
      type: 'collapse',
      icon: icons.FlagIN,
      children: [
        {
          id: 'in',
          title: 'Coming soon',
          type: 'item',
          url: '/india',
          // target: true
        },
      ],
    },
  ],
};

export default pages;
