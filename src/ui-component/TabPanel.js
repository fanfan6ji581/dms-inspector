import PropTypes from 'prop-types';

import { Box } from '@mui/material';

export const a11yProps = (id, index) => ({
  id: `${id}-${index}`,
  'aria-controls': `${id}-${index}`,
});

const TabPanel = (props) => {
  const { children, value, index, id, ...other } = props;

  return (
    <Box role="tabpanel" hidden={value !== index} id={`${id}-${index}`} aria-labelledby={`${id}-${index}`} {...other}>
      {value === index && children}
    </Box>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default TabPanel;
