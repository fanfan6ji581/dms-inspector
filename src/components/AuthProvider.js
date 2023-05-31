import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import LinearProgress from '@mui/material/LinearProgress';

import SnackbarComponent from '../components/Snackbar';
import { login, storeToken } from '../reducers/authSlice';
import { hideLoading, isLoadingShownS, showLoading } from '../reducers/layoutSlice';
import axios from '../utils/axios';

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const isLoadingShown = useSelector(isLoadingShownS);
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  useEffect(() => {
    // update local storage
    if (token) {
      dispatch(storeToken(token));
    }

    dispatch(showLoading());
    // Simulating asynchronous authentication check
    const auth = async () => {
      // Check if the user is already authenticated (e.g., using a token stored in local storage)
      try {
        const { data } = await axios.get('/auth/info');
        dispatch(login(data));
      } catch (error) {
        navigate('/login');
      }
      setIsLoading(false);
      dispatch(hideLoading());
    };

    auth();
  }, []);

  return (
    <>
      {isLoadingShown && <LinearProgress sx={{ position: 'fixed', width: '100vw', top: 0, zIndex: 1101 }} />}
      {!isLoading && (
        <>
          <SnackbarComponent />
          {children}
        </>
      )}
    </>
  );
};

export default AuthProvider;
