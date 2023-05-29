import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { AppBar, Box, Toolbar, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

import { drawerWidth } from '../../app/constants';
import { isSidebarShownS, showSideBar, toggleSideBar } from '../../reducers/layoutSlice';

import Header from './Header';
import Sidebar from './Sidebar';

// styles
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  ...theme.typography.mainContent,
  ...(!open && {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    padding: 16,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.up('md')]: {
      marginLeft: -(drawerWidth - 20),
      width: `calc(100% - ${drawerWidth}px)`,
    },
    [theme.breakpoints.down('md')]: {
      marginLeft: 20,
      width: `calc(100% - ${drawerWidth}px)`,
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: 10,
      marginRight: 10,
      padding: 10,
      width: 'calc(100% - 20px)',
    },
  }),
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    padding: 16,
    width: `calc(100% - ${drawerWidth}px)`,
    [theme.breakpoints.down('md')]: {
      marginLeft: 20,
    },
    [theme.breakpoints.down('sm')]: {
      padding: 10,
      marginLeft: 10,
      marginRight: 10,
    },
  }),
}));

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  // Handle left drawer
  const isSidebarShown = useSelector(isSidebarShownS);
  const dispatch = useDispatch();
  const handleLeftDrawerToggle = () => {
    dispatch(toggleSideBar());
  };

  // useEffect(() => {
  // dispatch(showSideBar(!matchDownMd));
  // }, [matchDownMd]);

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        {/* header */}
        <AppBar
          enableColorOnDark
          position="fixed"
          color="inherit"
          elevation={0}
          sx={{
            bgcolor: theme.palette.background.default,
            transition: isSidebarShown ? theme.transitions.create('width') : 'none',
          }}
        >
          <Toolbar>
            <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
          </Toolbar>
        </AppBar>

        {/* drawer */}
        <Sidebar />

        {/* main content */}
        <Main theme={theme} open={isSidebarShown}>
          <Outlet />
        </Main>
      </Box>
    </>
  );
};

export default MainLayout;
