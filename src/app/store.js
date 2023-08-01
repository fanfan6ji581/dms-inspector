import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../reducers/authSlice';
import layoutReducer from '../reducers/layoutSlice';
import malaysiaReducer from '../reducers/malaysiaSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    layout: layoutReducer,
    malaysia: malaysiaReducer,
  },
});
