import { Link } from 'react-router-dom';

import { Box, Stack, Typography } from '@mui/material';
// material-ui
import { ButtonBase } from '@mui/material';

import LogoImg from '../../../assets/img/logo.png';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
  return (
    <ButtonBase disableRipple component={Link} to="/">
      <Stack direction="row" alignItems="center">
        <Box component="img" src={LogoImg} sx={{ width: 44 }} />
        <Stack alignItems="start" sx={{ ml: 2 }}>
          <Typography variant="h3">DMS</Typography>
          <Typography variant="subtitle2">Inspector</Typography>
        </Stack>
      </Stack>
    </ButtonBase>
  );
};

export default LogoSection;
