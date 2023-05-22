import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: !!localStorage.getItem('token'),
    inspector: null,
    token: localStorage.getItem('token'),
  },
  reducers: {
    storeToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', state.token);
    },
    login: (state, action) => {
      state.isAuthenticated = true;
      state.inspector = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.inspector = null;
      localStorage.removeItem('token');
    },
  },
});

export const isAuthenticatedS = (state) => state.auth.isAuthenticated;
export const inspectorS = (state) => state.auth.inspector;
export const { login, logout, storeToken } = authSlice.actions;
export default authSlice.reducer;
