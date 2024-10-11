import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Plant } from "../App/models/Plant";
// import { TreflePlant } from "../App/models/TreflePlant";

export interface PlantState {
  // treflePlant: TreflePlant;
  plant: Plant;
  plantList: Plant[];
}

// const treflePlant =
//   localStorage.getItem("treflePlant") !== null
//     ? JSON.parse(localStorage.getItem("treflePlant")!)
//     : {};
const plant =
  localStorage.getItem("plant") && localStorage.getItem("plant") !== "undefined"
    ? JSON.parse(localStorage.getItem("plant")!)
    : {};
const plants =
  localStorage.getItem("plants") &&
  localStorage.getItem("plants") !== "undefined"
    ? JSON.parse(localStorage.getItem("plants")!)
    : [];

// State
const initialState: PlantState = {
  // treflePlant: treflePlant,
  plant: plant,
  plantList: plants,
};

export const plantSlice = createSlice({
  name: "plant",
  initialState,
  // Reducers
  reducers: {
    // updateCurrentTreflePlant: (state, action: PayloadAction<TreflePlant>) => {
    //   state.treflePlant = action.payload;
    //   localStorage.setItem("treflePlant", JSON.stringify(action.payload));
    // },
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
export const {
  // updateCurrentTreflePlant,
  updateCurrentPlant,
  updateCurrentPlantList,
} = plantSlice.actions;

export default plantSlice.reducer;
