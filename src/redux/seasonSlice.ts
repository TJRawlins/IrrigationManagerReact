/* eslint-disable prefer-const */
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

let season, seasons, seasonName, seasonId, isInitialLoad;

season =
  season && season !== "undefined"
    ? JSON.parse(localStorage.getItem("season")!)
    : 1;
seasons =
  seasons && seasons !== "undefined"
    ? JSON.parse(localStorage.getItem("seasons")!)
    : 1;
seasonName =
  seasonName && seasonName !== "undefined"
    ? JSON.parse(localStorage.getItem("seasonName")!)
    : 1;
seasonId =
  seasonId && seasonId !== "undefined"
    ? JSON.parse(localStorage.getItem("seasonId")!)
    : 1;
isInitialLoad =
  isInitialLoad && isInitialLoad !== "undefined"
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
