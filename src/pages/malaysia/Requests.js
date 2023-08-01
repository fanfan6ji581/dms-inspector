import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import { Chip } from '@mui/material';
import {
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Link as MuiLink,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { List, ListItem } from '@mui/material';

import { hideLoading, isLoadingS, showLoading, showMessage } from '../../reducers/layoutSlice';
import Breadcrumbs from '../../ui-component/Breadcrumbs';
import MainCard from '../../ui-component/cards/MainCard';
import StatusChip from '../../ui-component/StatusChip';
import axios from '../../utils/axios';
import { getStatus } from '../../utils/status';

const LOADING_KEY = 'fetching-requests';

const Requests = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [requests, setRequests] = useState([]);
  const isLoading = useSelector(isLoadingS(LOADING_KEY));
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [filterOptions, setFilterOptions] = useState({
    arranged: false,
    inspected: false,
    uploaded: false,
    finished: false,
    cancelled: false,
  });

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleFilterChange = (option) => (event) => {
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      [option]: event.target.checked,
    }));
  };

  const handleFilterDelete = (option) => () => {
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      [option]: false,
    }));
  };

  const fetchData = async () => {
    dispatch(showLoading(LOADING_KEY));
    try {
      const { data } = await axios.get('/malaysia/requests');
      const requests = data.map((data) => ({ ...data, id: data._id }));
      setRequests(requests);
    } catch (err) {
      console.error(err);
      dispatch(showMessage(err.response?.data?.error?.msg || 'An error occurred', 'error'));
    }
    dispatch(hideLoading(LOADING_KEY));
  };

  useEffect(() => {
    switch (location.pathname) {
      case '/malaysia/resolved-requests':
        setFilterOptions({
          arranged: false,
          inspected: false,
          uploaded: false,
          cancelled: true,
          finished: true,
        });
        break;
      case '/malaysia/pending-requests':
        setFilterOptions({
          arranged: true,
          inspected: true,
          uploaded: true,
          cancelled: false,
          finished: false,
        });
        break;
      default:
        setFilterOptions({
          arranged: false,
          inspected: false,
          uploaded: false,
          cancelled: false,
          finished: false,
        });
        break;
    }
  }, [location]);

  useEffect(() => {
    fetchData();
  }, []);

  const breadcrumbsData = [{ title: 'Malaysia' }];

  const filteredRequests = searchTerm
    ? requests.filter((request) => request.jobNo.includes(searchTerm))
    : requests.filter((request) => {
        const { arranged, inspected, uploaded, finished, cancelled } = filterOptions;
        // If no filter is selected, return all requests
        if (!arranged && !inspected && !uploaded && !finished && !cancelled) return true;
        // If specific filter is selected, return only the requests that match the selected filter
        if (arranged && getStatus(request.status) === 'arranged') return true;
        if (inspected && getStatus(request.status) === 'inspected') return true;
        if (uploaded && getStatus(request.status) === 'uploaded') return true;
        if (finished && getStatus(request.status) === 'finished') return true;
        if (cancelled && getStatus(request.status) === 'cancelled') return true;
        return false;
      });

  return (
    <>
      <MainCard title="All Requests" secondary={<Breadcrumbs breadcrumbsData={breadcrumbsData} />} contentSX={{ p: 3 }}>
        <Grid container spacing={1} alignItems="center" justifyContent="space-between">
          <Grid item>
            <TextField
              variant="outlined"
              value={searchTerm}
              size="small"
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              placeholder="Search Job Number"
            />
          </Grid>
          <Grid
            item
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'flex-end',
              alignItems: 'center',
              '&::after': {
                content: '""',
                flex: 'auto',
              },
            }}
          >
            <Tooltip title="Filter">
              <IconButton size="small" color="primary" onClick={handleFilterClick}>
                <FilterListIcon />
              </IconButton>
            </Tooltip>

            <Menu
              anchorEl={filterAnchorEl}
              open={Boolean(filterAnchorEl)}
              onClose={handleFilterClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              {Object.entries(filterOptions).map(([key, value]) => (
                <MenuItem key={key}>
                  <FormControlLabel
                    control={<Checkbox checked={value} onChange={handleFilterChange(key)} />}
                    label={key}
                    sx={{ textTransform: 'capitalize' }}
                  />
                </MenuItem>
              ))}
            </Menu>
          </Grid>
          <Grid item xs={12}>
            {Object.entries(filterOptions).map(([key, value]) =>
              value ? (
                <Chip
                  key={key}
                  label={key}
                  onDelete={handleFilterDelete(key)}
                  sx={{ textTransform: 'capitalize', mr: 1, mb: 1 }}
                />
              ) : null
            )}
          </Grid>
        </Grid>
        {filteredRequests.length === 0 ? (
          isLoading ? (
            <Typography variant="body1" sx={{ mt: 2 }}>
              Loading...
            </Typography>
          ) : (
            <Typography variant="body1" sx={{ mt: 2 }}>
              No requests found.
            </Typography>
          )
        ) : (
          <List>
            {filteredRequests.map((request) => (
              <ListItem key={request.id} divider={true}>
                <Stack flex="1">
                  <MuiLink
                    component={Link}
                    underline="hover"
                    color="primary"
                    to={`/malaysia/requests/${request.jobNo}`}
                  >
                    <Typography variant="body1">{request.jobNo}</Typography>
                  </MuiLink>
                  <Grid container>
                    <Grid item flexGrow={1}>
                      <Stack direction="row" spacing="1" alignItems="center">
                        <Typography variant="subtitle2">{` ${request.exporterName}`}</Typography>
                      </Stack>
                    </Grid>

                    <Grid item flexGrow={1}>
                      <Stack direction="row" spacing="1" alignItems="center">
                        <Typography variant="subtitle2">PO No.: </Typography>
                        <Typography variant="subtitle2">{` ${request.poNo}`}</Typography>
                      </Stack>
                    </Grid>
                    <Grid item flexGrow={1}>
                      <Stack direction="row" spacing="1" alignItems="center">
                        <Typography variant="subtitle2">{` ${request.goodsType}`}</Typography>
                      </Stack>
                    </Grid>
                    <Grid item flexGrow={1}>
                      <Stack direction="row" spacing="1" alignItems="center">
                        <Typography variant="subtitle2">{` ${dayjs(request.createdAt).format(
                          'D MMMM YYYY'
                        )}`}</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </Stack>
                <Typography variant="subtitle1">
                  <StatusChip status={request.status} />
                </Typography>
              </ListItem>
            ))}
          </List>
        )}
      </MainCard>
    </>
  );
};

export default Requests;
