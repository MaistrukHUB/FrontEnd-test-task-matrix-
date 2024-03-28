import { configureStore } from "@reduxjs/toolkit";
import matrixSlice from "./slice/matrix";
import sumsRowsSlice from "./slice/sumsRows";

const store = configureStore({
  reducer: {
    matrixSlice,
    sumsRowsSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
