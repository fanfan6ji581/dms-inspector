import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Link as MuiLink,
  Typography,
} from '@mui/material';

import MainCard from '../ui-component/cards/MainCard';
import CountryFlag from '../ui-component/CountryFlag';
import axios from '../utils/axios';

const HomePage = () => {
  useEffect(() => {}, []);

  return (
    <>
      <MainCard title="DMS Inspector - Alex Stewart (AU)" contentSX={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Welcome to DMS Inspector - New inspector portal
        </Typography>
      </MainCard>

      <Grid container columnSpacing={3} rowSpacing={2} sx={{ my: 0 }}>
        <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', alignItems: 'stretch' }}>
          <Card sx={{ flex: 1, boxShadow: 1 }}>
            <CardHeader title="MALAYSIA" action={<CountryFlag countryCode="MY" />} sx={{ px: 3 }} />
            <CardContent sx={{ px: 3, py: 0, flex: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Manage history requests for inspection.
              </Typography>
            </CardContent>
            <CardActions sx={{ px: 3 }}>
              <Button variant="outlined" color="primary" component={Link} to="/malaysia/requests">
                Manage
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', alignItems: 'stretch' }}>
          <Card sx={{ flex: 1, boxShadow: 1 }}>
            <CardHeader title="INDONESIA" action={<CountryFlag countryCode="ID" />} sx={{ px: 3 }} />
            <CardContent sx={{ px: 3, py: 0, flex: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Under construction ...
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Please continue use Indonesia VO system.
              </Typography>
            </CardContent>
            <CardActions sx={{ px: 3 }}>
              <Button
                variant="outlined"
                color="primary"
                component={MuiLink}
                href={`${process.env.REACT_APP_VO_URL}inspector`}
              >
                VO System
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', alignItems: 'stretch' }}>
          <Card sx={{ flex: 1, boxShadow: 1 }}>
            <CardHeader title="INDIA" action={<CountryFlag countryCode="IN" />} sx={{ px: 3 }} />
            <CardContent sx={{ px: 3, py: 0, flex: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Under construction ...
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default HomePage;
