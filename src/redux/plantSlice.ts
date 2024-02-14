import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Plant } from "../app/models/Plant";

export interface PlantState {
  plant: Plant;
  plantList: Plant[];
}

// State
const initialState: PlantState = {
  plant: {
    id: 0,
    name: "",
    type: "",
    quantity: 0,
    galsPerWk: 0,
    emittersPerPlant: 0,
    emitterGPH: 0,
    timeStamp: null,
    zoneId: 0,
  },
  plantList: [],
};

export const plantSlice = createSlice({
  name: "plant",
  initialState,
  // Reducers
  reducers: {
    updateCurrentPlant: (state, action: PayloadAction<Plant>) => {
      state.plant = action.payload;
    },
    updateCurrentPlantList: (state, action: PayloadAction<Plant[]>) => {
      state.plantList = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateCurrentPlant, updateCurrentPlantList } =
  plantSlice.actions;

export default plantSlice.reducer;
