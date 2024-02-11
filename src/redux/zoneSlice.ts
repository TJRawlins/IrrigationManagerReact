import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Zone } from "../app/models/Zone";

export interface ZoneState {
  zone: Zone;
}

// State
const initialState: ZoneState = {
  zone: new Zone(),
};

export const zoneSlice = createSlice({
  name: "zone",
  initialState,
  // Reducers
  reducers: {
    updateCurrentZone: (state, action: PayloadAction<Zone>) => {
      state.zone = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateCurrentZone } = zoneSlice.actions;

export default zoneSlice.reducer;
