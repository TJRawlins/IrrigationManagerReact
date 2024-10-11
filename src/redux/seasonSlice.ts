import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Season } from "../App/models/Season";

export interface SeasonState {
  season: Season;
  seasonList: Season[];
  seasonName: string;
  seasonId: number;
  isInitialLoad: boolean;
}

const season =
  localStorage.getItem("season") &&
  localStorage.getItem("season") !== "undefined"
    ? JSON.parse(localStorage.getItem("season")!)
    : {};
const seasons =
  localStorage.getItem("seasons") &&
  localStorage.getItem("seasons") !== "undefined"
    ? JSON.parse(localStorage.getItem("seasons")!)
    : [];
const seasonName =
  localStorage.getItem("seasonName") &&
  localStorage.getItem("seasonName") !== "undefined"
    ? JSON.parse(localStorage.getItem("seasonName")!)
    : "Select Season";
const seasonId =
  localStorage.getItem("seasonId") &&
  localStorage.getItem("seasonId") !== "undefined"
    ? JSON.parse(localStorage.getItem("seasonId")!)
    : 0;
const isInitialLoad =
  localStorage.getItem("isInitialLoad") &&
  localStorage.getItem("isInitialLoad") !== "undefined"
    ? JSON.parse(localStorage.getItem("isInitialLoad")!)
    : false;

// State
const initialState: SeasonState = {
  season: season,
  seasonList: seasons,
  seasonName: seasonName,
  seasonId: seasonId,
  isInitialLoad: isInitialLoad,
};

export const seasonSlice = createSlice({
  name: "season",
  initialState,
  // Reducers
  reducers: {
    updateCurrentSeasonName: (state, action: PayloadAction<string>) => {
      state.seasonName = action.payload;
      localStorage.setItem("seasonName", JSON.stringify(action.payload));
    },
    updateCurrentSeason: (state, action: PayloadAction<Season>) => {
      state.season = action.payload;
      localStorage.setItem("season", JSON.stringify(action.payload));
    },
    updateCurrentSeasonList: (state, action: PayloadAction<Season[]>) => {
      state.seasonList = action.payload;
      localStorage.setItem("seasons", JSON.stringify(action.payload));
    },
    updateIsInitialLoad: (state, action: PayloadAction<boolean>) => {
      state.isInitialLoad = action.payload;
      localStorage.setItem("isInitialLoad", JSON.stringify(action.payload));
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateCurrentSeasonName,
  updateCurrentSeason,
  updateCurrentSeasonList,
  updateIsInitialLoad,
} = seasonSlice.actions;

export default seasonSlice.reducer;
