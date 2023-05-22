import { createSlice } from '@reduxjs/toolkit';

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState: {
    message: '',
    open: false,
    options: {},
  },
  reducers: {
    showSnackbar: {
      reducer: (state, action) => {
        state.message = action.payload.message;
        state.options = action.payload.options;
        state.open = true;
      },
      prepare: (message, options = {}) => ({ payload: { message, options } }),
    },
    hideSnackbar: (state) => {
      state.message = '';
      state.options = {};
      state.open = false;
    },
  },
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
