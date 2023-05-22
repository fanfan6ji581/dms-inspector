import LinearProgress from '@mui/material/LinearProgress';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import SnackbarComponent from '../components/Snackbar';
import { login } from '../reducers/authSlice';
import axios from '../utils/axios';

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating asynchronous authentication check
    const auth = async () => {
      // Check if the user is already authenticated (e.g., using a token stored in local storage)
      try {
        const { data } = await axios.get(`/auth/info`);
        dispatch(login(data.inspector));
      } catch (error) {
        console.log(error);
        navigate('/login');
      }
      setIsLoading(false);
    };

    auth();
  }, [dispatch, navigate, axios]);

  return (
    <>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <>
          <SnackbarComponent />
          {children}
        </>
      )}
    </>
  );
};

export default AuthProvider;
