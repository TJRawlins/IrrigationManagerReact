import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SeasonState {
  seasonName: string;
}

// State
const initialState: SeasonState = {
  seasonName: "Summer",
};

export const seasonSlice = createSlice({
  name: "season",
  initialState,
  // Reducers
  reducers: {
    updateCurrentSeason: (state, action: PayloadAction<string>) => {
      state.seasonName = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateCurrentSeason } = seasonSlice.actions;

export default seasonSlice.reducer;
