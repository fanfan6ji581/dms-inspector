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
  // title: 'RFIs',
  // caption: 'Request for Information',
  type: 'group',
  children: [
    {
      id: 'malaysia',
      title: 'Malaysia',
      type: 'collapse',
      icon: icons.FlagMY,
      children: [
        {
          id: 'my',
          title: 'All RFIs',
          type: 'item',
          url: '/my',
          // target: true
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
          url: '/id',
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
          url: '/in',
          // target: true
        },
      ],
    },
  ],
};

export default pages;
