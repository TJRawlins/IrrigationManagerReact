import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  drawerOpen: boolean;
}

const initialState: UIState = {
  drawerOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setDrawerOpen: (state, action: PayloadAction<boolean>) => {
      state.drawerOpen = action.payload;
    },
    toggleDrawer: (state) => {
      state.drawerOpen = !state.drawerOpen;
    },
    closeDrawer: (state) => {
      state.drawerOpen = false;
    },
    openDrawer: (state) => {
      state.drawerOpen = true;
    },
  },
});

export const { setDrawerOpen, toggleDrawer, closeDrawer, openDrawer } =
  uiSlice.actions;
export default uiSlice.reducer;
