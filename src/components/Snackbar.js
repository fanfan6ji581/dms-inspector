import { Snackbar, useMediaQuery } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useTheme } from '@mui/material/styles';
// SnackbarComponent.js
import { forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { hideSnackbar } from '../reducers/snackbarSlice';

const Alert = forwardRef((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackbarComponent = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const snackbar = useSelector((state) => state.snackbar);
  const matchDownMd = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClose = () => {
    dispatch(hideSnackbar());
  };

  return (
    <>
      {snackbar.open && (
        <Snackbar
          open={snackbar.open}
          anchorOrigin={{
            vertical: snackbar?.options?.vertical || 'top',
            horizontal: snackbar?.options?.horizontal || 'center',
          }}
          autoHideDuration={snackbar?.options?.duration || 2000}
          onClose={handleClose}
          sx={{
            maxWidth: 'calc(100% - 16px)',
          }}
          {...snackbar.options}
        >
          <Alert severity={snackbar?.options?.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default SnackbarComponent;
