import { createSlice } from '@reduxjs/toolkit';

const layoutSlice = createSlice({
  name: 'layout',
  initialState: {
    openedMenuItems: [], // for active default menu
    isSidebarShown: window.innerWidth > 960, // if sidebar is opened, 960 is md
    // global loading bar
    isLoadingShown: false,
    loadingQueue: [],
    // snackbar
    snackbar: {
      message: '',
      open: false,
      options: {},
    },
  },
  reducers: {
    openMenuItem: (state, action) => {
      state.openedMenuItems = [action.payload];
    },
    showSideBar: (state, action) => {
      state.isSidebarShown = action.payload;
    },
    toggleSideBar: (state) => {
      state.isSidebarShown = !state.isSidebarShown;
    },
    showLoading: (state, action) => {
      state.loadingQueue.push(action?.payload || '');
      state.isLoadingShown = state.loadingQueue.length > 0;
    },
    hideLoading: (state) => {
      state.loadingQueue.pop();
      state.isLoadingShown = state.loadingQueue.length > 0;
    },
    showSnackbar: {
      reducer: (state, action) => {
        state.snackbar = {
          message: action.payload.message,
          options: action.payload.options,
          open: true,
        };
      },
      prepare: (message, options = {}) => ({ payload: { message, options } }),
    },
    hideSnackbar: (state) => {
      state.snackbar = {
        message: '',
        options: {},
        open: false,
      };
    },
  },
});
export const openedMenuItemsS = (state) => state.layout.openedMenuItems;
export const isSidebarShownS = (state) => state.layout.isSidebarShown;
export const isLoadingShownS = (state) => state.layout.isLoadingShown;
export const snackbarS = (state) => state.layout.snackbar;
export const { openMenuItem, showSideBar, toggleSideBar, showLoading, hideLoading, showSnackbar, hideSnackbar } =
  layoutSlice.actions;
export default layoutSlice.reducer;
