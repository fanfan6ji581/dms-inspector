import { Button, Typography } from '@mui/material';

import MainCard from '../../ui-component/cards/MainCard';

const IndonesiaPage = () => {
  return (
    <>
      <MainCard title="Indonesia" contentSX={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Under construction ...{' '}
        </Typography>
        <Typography variant="body1" sx={{ my: 3 }}>
          Please still use Indonesia VO System for now.
        </Typography>
        <Button href={`${process.env.REACT_APP_VO_URL}inspector`} component="a" color="primary" variant="contained">
          Indonesia VO System
        </Button>{' '}
      </MainCard>
    </>
  );
};

export default IndonesiaPage;
