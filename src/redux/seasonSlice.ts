import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Season } from "../App/models/Season";

export interface SeasonState {
  season: Season;
  seasonList: Season[];
  // seasonName: string;
  seasonId: number;
}

const season =
  localStorage.getItem("season") !== null
    ? JSON.parse(localStorage.getItem("season")!)
    : {};
const seasons =
  localStorage.getItem("seasons") !== null
    ? JSON.parse(localStorage.getItem("seasons")!)
    : [];

// State
const initialState: SeasonState = {
  season: season,
  seasonList: seasons,
  // seasonName: "Summer",
  seasonId: 1,
};

export const seasonSlice = createSlice({
  name: "season",
  initialState,
  // Reducers
  reducers: {
    // updateCurrentSeasonName: (state, action: PayloadAction<Season>) => {
    //   state.seasonName = action.payload;
    //   localStorage.setItem("seasonName", JSON.stringify(action.payload));
    // },
    updateCurrentSeason: (state, action: PayloadAction<Season>) => {
      state.season = action.payload;
      localStorage.setItem("season", JSON.stringify(action.payload));
    },
    updateCurrentSeasonList: (state, action: PayloadAction<Season[]>) => {
      state.seasonList = action.payload;
      localStorage.setItem("seasons", JSON.stringify(action.payload));
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateCurrentSeason, updateCurrentSeasonList } =
  seasonSlice.actions;

export default seasonSlice.reducer;
