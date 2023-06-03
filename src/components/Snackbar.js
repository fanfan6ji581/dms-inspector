import { useDispatch, useSelector } from 'react-redux';

import { Alert, Snackbar } from '@mui/material';

import { hideSnackbar, snackbarS } from '../reducers/layoutSlice';

const SnackbarComponent = () => {
  const dispatch = useDispatch();
  const snackbar = useSelector(snackbarS);

  const handleClose = () => {
    dispatch(hideSnackbar());
  };

  return (
    <>
      {snackbar?.open && (
        <Snackbar
          open={snackbar?.open}
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
          <Alert variant="filled" severity={snackbar?.options?.severity || 'info'} sx={{ width: '100%' }}>
            {snackbar?.message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default SnackbarComponent;
