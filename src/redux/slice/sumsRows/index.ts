import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../index";
import { IVisionSumRow } from "../../../components/@types/visionSumRow";

const initialState: IVisionSumRow = {
  visionPercent: false,
  indexRow: null,
  sumValue: null,
};

const sumsRowsSlice = createSlice({
  name: "sumsRows",
  initialState,
  reducers: {
    setVisible(
      state,
      action: PayloadAction<{ indexRow: number; sumValue: number }>
    ) {
      state.indexRow = action.payload.indexRow;
      state.visionPercent = true;
      state.sumValue = action.payload.sumValue;
    },
    setInvisible(state) {
      state.sumValue = null;
      state.visionPercent = false;
    },
  },
});

export const selectVisionPercent = (state: RootState) =>
  state.sumsRowsSlice.visionPercent;

export const { setVisible, setInvisible } = sumsRowsSlice.actions;

export default sumsRowsSlice.reducer;
