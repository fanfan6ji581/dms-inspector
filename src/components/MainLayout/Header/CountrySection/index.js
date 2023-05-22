import PublicIcon from '@mui/icons-material/Public';
import {
  Avatar,
  Box,
  ButtonBase,
  ClickAwayListener,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { openMenuItem } from '../../../../reducers/layoutSlice';
import MainCard from '../../../../ui-component/cards/MainCard';
import CountryFlag from '../../../../ui-component/CountryFlag';
import Transitions from '../../../../ui-component/extended/Transitions';

// ==============================|| PROFILE MENU ||============================== //

const CountrySection = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState('');
  /**
   * anchorRef is used on different componets and specifying one type leads to other components throwing an error
   * */
  const anchorRef = useRef(null);

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleListItemClick = (event, index, route = '') => {
    setSelectedIndex(index);
    handleClose(event);

    if (route && route !== '') {
      navigate(route);
    }
  };
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const prevOpen = useRef(open);

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  useEffect(() => {
    if (location.pathname.toLowerCase().startsWith('/my')) {
      setCountry('MY');
      dispatch(openMenuItem('my'));
      setSelectedIndex(0);
    } else if (location.pathname.toLowerCase().startsWith('/id')) {
      setCountry('ID');
      dispatch(openMenuItem('id'));
      setSelectedIndex(1);
    } else if (location.pathname.toLowerCase().startsWith('/in')) {
      setCountry('IN');
      dispatch(openMenuItem('in'));
      setSelectedIndex(2);
    } else {
      setCountry('');
      setSelectedIndex(-1);
    }
  }, [location]);

  return (
    <>
      <Box
        sx={{
          ml: 2,
          mr: 3,
          [theme.breakpoints.down('md')]: {
            mr: 2,
          },
        }}
      >
        <ButtonBase sx={{ borderRadius: '12px' }}>
          <Avatar
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              transition: 'all .2s ease-in-out',
              background: theme.palette.secondary.light,
              color: theme.palette.secondary.dark,
              '&[aria-controls="menu-list-grow"],&:hover': {
                background: theme.palette.secondary.dark,
                color: theme.palette.secondary.light,
              },
            }}
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            color="inherit"
          >
            {country ? <CountryFlag countryCode={country} /> : <PublicIcon />}
          </Avatar>
        </ButtonBase>
      </Box>
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 14],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Transitions in={open} {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                  <Box sx={{ px: 2, py: 1 }}>
                    <List
                      component="nav"
                      sx={{
                        width: '100%',
                        maxWidth: 250,
                        minWidth: 200,
                        backgroundColor: theme.palette.background.paper,
                        borderRadius: '10px',
                        [theme.breakpoints.down('md')]: {
                          minWidth: '100%',
                        },
                        '& .MuiListItemButton-root': {
                          mt: 0.5,
                        },
                      }}
                    >
                      <ListItemButton
                        sx={{ borderRadius: `12px` }}
                        selected={selectedIndex === 0}
                        onClick={(event) => handleListItemClick(event, 0, '/my')}
                      >
                        <ListItemIcon>
                          <CountryFlag countryCode="MY" />
                        </ListItemIcon>
                        <ListItemText primary={<Typography variant="body2">Malaysia</Typography>} />
                      </ListItemButton>
                      <ListItemButton
                        sx={{ borderRadius: `12px` }}
                        selected={selectedIndex === 1}
                        onClick={(event) => handleListItemClick(event, 1, '/id')}
                      >
                        <ListItemIcon>
                          <CountryFlag countryCode="ID" />
                        </ListItemIcon>
                        <ListItemText primary={<Typography variant="body2">Indonesia</Typography>} />
                      </ListItemButton>
                      <ListItemButton
                        sx={{ borderRadius: `12px` }}
                        selected={selectedIndex === 2}
                        onClick={(event) => handleListItemClick(event, 2, '/in')}
                      >
                        <ListItemIcon>
                          <CountryFlag countryCode="IN" />
                        </ListItemIcon>
                        <ListItemText primary={<Typography variant="body2">India</Typography>} />
                      </ListItemButton>
                    </List>
                  </Box>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </>
  );
};

export default CountrySection;
