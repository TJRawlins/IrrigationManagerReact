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

let season;
let seasons;

// if (season !== null && season !== "undefined" && season !== undefined) {
if (season && season !== "undefined") {
  season = JSON.parse(localStorage.getItem("season")!);
} else {
  season = {};
}

if (seasons && seasons !== "undefined") {
  seasons = JSON.parse(localStorage.getItem("seasons")!);
} else {
  seasons = [];
}

const seasonName =
  localStorage.getItem("seasonName") !== null
    ? JSON.parse(localStorage.getItem("seasonName")!)
    : "Summer";
const seasonId =
  localStorage.getItem("seasonId") !== null
    ? JSON.parse(localStorage.getItem("seasonId")!)
    : 1;
const isInitialLoad =
  localStorage.getItem("isInitialLoad") !== null
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
