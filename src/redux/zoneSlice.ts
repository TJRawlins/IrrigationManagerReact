import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Zone } from "../app/models/Zone";

export interface ZoneState {
  zone: Zone;
  zoneList: Zone[];
}

// State
const initialState: ZoneState = {
  zone: new Zone(),
  zoneList: [],
};

export const zoneSlice = createSlice({
  name: "zone",
  initialState,
  // Reducers
  reducers: {
    updateCurrentZone: (state, action: PayloadAction<Zone>) => {
      state.zone = action.payload;
    },
    updateCurrentZoneList: (state, action: PayloadAction<Zone[]>) => {
      state.zoneList = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateCurrentZone, updateCurrentZoneList } = zoneSlice.actions;

export default zoneSlice.reducer;
