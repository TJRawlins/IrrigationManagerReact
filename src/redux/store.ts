import { configureStore } from "@reduxjs/toolkit";
import seasonReducer from "./seasonSlice";
import seasonIdReducer from "./seasonSlice";
import zoneReducer from "./zoneSlice";
// ...

export const store = configureStore({
  reducer: {
    seasonName: seasonReducer,
    seasonId: seasonIdReducer,
    zone: zoneReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
