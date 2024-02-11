import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SeasonState {
  seasonName: string;
  seasonId: number;
}

// State
const initialState: SeasonState = {
  seasonName: "Summer",
  seasonId: 1,
};

export const seasonSlice = createSlice({
  name: "season",
  initialState,
  // Reducers
  reducers: {
    updateCurrentSeason: (state, action: PayloadAction<string>) => {
      state.seasonName = action.payload;
      switch (state.seasonName) {
        case "Summer":
          state.seasonId = 1;
          break;
        case "Fall":
          state.seasonId = 2;
          break;
        case "Winter":
          state.seasonId = 3;
          break;
        case "Spring":
          state.seasonId = 4;
          break;
        default:
          alert(`Season name ${action.payload} not valid`);
          break;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateCurrentSeason } = seasonSlice.actions;

export default seasonSlice.reducer;
