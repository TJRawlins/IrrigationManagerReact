import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Plant } from "../app/models/Plant";

export interface PlantState {
  plant: Plant;
  plantList: Plant[];
}

const plant =
  localStorage.getItem("plant") !== null
    ? JSON.parse(localStorage.getItem("plant")!)
    : {};
const plants =
  localStorage.getItem("plants") !== null
    ? JSON.parse(localStorage.getItem("plants")!)
    : [];

// State
const initialState: PlantState = {
  plant: plant,
  plantList: plants,
};

export const plantSlice = createSlice({
  name: "plant",
  initialState,
  // Reducers
  reducers: {
    updateCurrentPlant: (state, action: PayloadAction<Plant>) => {
      state.plant = action.payload;
      localStorage.setItem("plant", JSON.stringify(action.payload));
    },
    updateCurrentPlantList: (state, action: PayloadAction<Plant[]>) => {
      state.plantList = action.payload;
      localStorage.setItem("plants", JSON.stringify(action.payload));
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateCurrentPlant, updateCurrentPlantList } =
  plantSlice.actions;

export default plantSlice.reducer;
