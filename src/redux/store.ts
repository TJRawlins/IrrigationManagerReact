import { configureStore } from "@reduxjs/toolkit";
import seasonReducer from "./seasonSlice";
import seasonIdReducer from "./seasonSlice";
import zoneReducer from "./zoneSlice";
import zoneListReducer from "./zoneSlice";
import treflePlantReducer from "./plantSlice";
import plantReducer from "./plantSlice";
import plantListReducer from "./plantSlice";
// ...

export const store = configureStore({
  reducer: {
    seasonName: seasonReducer,
    seasonId: seasonIdReducer,
    season: seasonIdReducer,
    seasonList: seasonIdReducer,
    zone: zoneReducer,
    zoneList: zoneListReducer,
    treflePlant: treflePlantReducer,
    plant: plantReducer,
    plantList: plantListReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check due to localStorage usage
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
