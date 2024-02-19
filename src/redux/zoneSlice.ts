import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Zone } from "../app/models/Zone";

export interface ZoneState {
  zone: Zone;
  zoneList: Zone[];
}

const zone =
  localStorage.getItem("zone") !== null
    ? JSON.parse(localStorage.getItem("zone")!)
    : {};
const zones =
  localStorage.getItem("zones") !== null
    ? JSON.parse(localStorage.getItem("zones")!)
    : [];

// State
const initialState: ZoneState = {
  zone: zone,
  zoneList: zones,
};

export const zoneSlice = createSlice({
  name: "zone",
  initialState,
  // Reducers
  reducers: {
    updateCurrentZone: (state, action: PayloadAction<Zone>) => {
      state.zone = action.payload;
      localStorage.setItem("zone", JSON.stringify(action.payload));
    },
    updateCurrentZoneList: (state, action: PayloadAction<Zone[]>) => {
      state.zoneList = action.payload;
      localStorage.setItem("zones", JSON.stringify(action.payload));
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateCurrentZone, updateCurrentZoneList } = zoneSlice.actions;

export default zoneSlice.reducer;
