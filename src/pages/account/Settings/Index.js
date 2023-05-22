import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import { Box, Tab, Tabs, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import * as React from 'react';

import MainCard from '../../../ui-component/cards/MainCard';
import ChangePassword from './ChangePassword';
import Profile from './Profile';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const AccountSettings = () => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <MainCard title="Account Settings" contentSX={{ p: 0 }}>
      <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="Vertical tabs example"
          sx={{
            borderRight: 1,
            borderColor: 'divider',
            minWidth: matchUpMd ? 200 : 100,
          }}
        >
          <Tab
            label={matchUpMd ? <span style={{ paddingRight: '75px' }}>Profile</span> : ''}
            icon={<PersonIcon />}
            iconPosition="start"
            {...a11yProps(0)}
          />
          <Tab label={matchUpMd ? 'Change Password' : ''} icon={<LockIcon />} iconPosition="start" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0} style={{ width: `calc(100% - ${matchUpMd ? 200 : 100}px)` }}>
          <Profile />
        </TabPanel>
        <TabPanel value={value} index={1} style={{ width: `calc(100% - ${matchUpMd ? 200 : 100}px)` }}>
          <ChangePassword />
        </TabPanel>
      </Box>
    </MainCard>
  );
};

export default AccountSettings;
