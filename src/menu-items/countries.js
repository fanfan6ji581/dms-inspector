// assets
import ReactCountryFlag from 'react-country-flag';

// constant
const icons = {
  FlagMY: (
    <ReactCountryFlag
      countryCode="MY"
      aria-label="Malaysia"
      style={{
        fontSize: '1.75em',
      }}
    />
  ),
  FlagID: (
    <ReactCountryFlag
      countryCode="ID"
      aria-label="Indonesia"
      style={{
        fontSize: '1.75em',
      }}
    />
  ),
  FlagIN: (
    <ReactCountryFlag
      countryCode="IN"
      aria-label="India"
      style={{
        fontSize: '1.75em',
      }}
    />
  ),
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
