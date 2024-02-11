import { configureStore } from "@reduxjs/toolkit";
import seasonReducer from "./seasonSlice";
// ...

export const store = configureStore({
  reducer: {
    seasonName: seasonReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
