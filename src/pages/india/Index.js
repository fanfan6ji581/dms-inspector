import { Typography } from '@mui/material';

import MainCard from '../../ui-component/cards/MainCard';

const IndiaPage = () => {
  return (
    <>
      <MainCard title="India" contentSX={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Under construction ...{' '}
        </Typography>
      </MainCard>
    </>
  );
};

export default IndiaPage;
