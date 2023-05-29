import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import LinearProgress from '@mui/material/LinearProgress';

import SnackbarComponent from '../components/Snackbar';
import { login } from '../reducers/authSlice';
import { hideLoading, isLoadingShownS, showLoading } from '../reducers/layoutSlice';
import axios from '../utils/axios';

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const isLoadingShown = useSelector(isLoadingShownS);

  useEffect(() => {
    dispatch(showLoading());
    // Simulating asynchronous authentication check
    const auth = async () => {
      // Check if the user is already authenticated (e.g., using a token stored in local storage)
      try {
        const { data } = await axios.get('/auth/info');
        dispatch(login(data));
      } catch (error) {
        console.log(error);
        navigate('/login');
      }
      setIsLoading(false);
      dispatch(hideLoading());
    };

    auth();
  }, [dispatch, navigate, axios]);

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
