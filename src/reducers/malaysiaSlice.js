import { createSlice } from '@reduxjs/toolkit';

const malaysiaSlice = createSlice({
  name: 'malaysia',
  initialState: {
    request: null,
  },
  reducers: {
    setRequest: (state, action) => {
      state.request = action.payload;
    },
    updateRequest: (state, action) => {
      state.request = { ...state.request, ...action.payload };
    },
    clearRequest: (state) => {
      state.request = null;
    },
  },
});

export const requestS = (state) => state.malaysia.request;
export const { setRequest, updateRequest, clearRequest } = malaysiaSlice.actions;
export default malaysiaSlice.reducer;
