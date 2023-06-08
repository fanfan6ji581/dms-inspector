import { Link } from 'react-router-dom';

import { Link as MuiLink, Typography } from '@mui/material';

import MainCard from '../ui-component/cards/MainCard';

const NotFoundPage = () => {
  return (
    <>
      <MainCard title="404" contentSX={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Oops! You weren't supposed to see this
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          The page your're looking for no longer exists
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          Return to the{' '}
          <MuiLink component={Link} to="/home">
            home page
          </MuiLink>{' '}
          and remember: you haven't seen anything
        </Typography>
      </MainCard>
    </>
  );
};

export default NotFoundPage;
