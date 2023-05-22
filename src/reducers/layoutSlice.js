import { createSlice } from '@reduxjs/toolkit';

const layoutSlice = createSlice({
  name: 'layout',
  initialState: {
    openedMenuItems: [], // for active default menu
    isSidebarShown: window.innerWidth > 960, // if sidebar is opened, 960 is md
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
  },
});
export const openedMenuItemsS = (state) => state.layout.openedMenuItems;
export const isSidebarShownS = (state) => state.layout.isSidebarShown;
export const { openMenuItem, showSideBar, toggleSideBar } = layoutSlice.actions;
export default layoutSlice.reducer;
