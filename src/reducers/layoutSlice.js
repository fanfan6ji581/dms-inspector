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
    removeOpenMenuItem: (state, action) => {
      const index = state.openedMenuItems.indexOf(action.payload);
      if (index > -1) {
        state.openedMenuItems.splice(index, 1);
      }
    },
    showSideBar: (state, action) => {
      state.isSidebarShown = action.payload;
    },
    toggleSideBar: (state) => {
      state.isSidebarShown = !state.isSidebarShown;
    },
    showLoading: (state, action) => {
      const id = action?.payload || '';
      state.loadingQueue.push(id);
      state.isLoadingShown = state.loadingQueue.length > 0;
    },
    hideLoading: (state, action) => {
      const id = action?.payload || '';
      const payloadIndex = state.loadingQueue.indexOf(id);
      if (payloadIndex !== -1) {
        state.loadingQueue.splice(payloadIndex, 1);
      }
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
    showMessage: {
      reducer: (state, action) => {
        state.snackbar = {
          message: action.payload.message,
          options: { severity: action.payload.severity, ...action.payload.options },
          open: true,
        };
      },
      prepare: (message, severity = 'success', options = {}) => ({ payload: { message, severity, options } }),
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
export const isLoadingS = (item) => (state) => state.layout.loadingQueue.includes(item);
export const {
  openMenuItem,
  removeOpenMenuItem,
  showSideBar,
  toggleSideBar,
  showLoading,
  hideLoading,
  showSnackbar,
  hideSnackbar,
  showMessage,
} = layoutSlice.actions;
export default layoutSlice.reducer;
