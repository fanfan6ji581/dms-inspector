import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../reducers/authSlice';
import layoutReducer from '../reducers/layoutSlice';
import snackbarReducer from '../reducers/snackbarSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    layout: layoutReducer,
    snackbar: snackbarReducer,
  },
});