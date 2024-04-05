import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../index";
import { initialMatrix } from "../../../helpers/initialMatrix";
import { calcAverageValues } from "../../../helpers/initialAverage";
import { calcSumString } from "../../../helpers/initialSums";
import {
  IMatrixInitialState,
  matrixItem,
} from "../../../components/@types/matrix/matrix";

const initialState: IMatrixInitialState = {
  n: null,
  m: null,
  matrix: null,
  averages: [],
  sums: [],
};

initialState.sums = initialState.matrix
  ? calcSumString(initialState.matrix)
  : [];

initialState.averages = initialState.matrix
  ? calcAverageValues(initialState.matrix)
  : [];

const matrixSlice = createSlice({
  name: "matrix",
  initialState,
  reducers: {
    checkRange(state, action: PayloadAction<{ rangeValue: number }>) {
      if (action.payload.rangeValue !== 0) {
        const { rangeValue } = action.payload;
        const x = rangeValue + 10;
        const y = rangeValue - 10;

        if (state.matrix) {
          state.matrix.forEach((row) => {
            row.forEach((item) => {
              if (item.value >= y && item.value <= x) {
                item.inRange = true;
              } else {
                item.inRange = false;
              }
            });
          });
        }
      } else {
        if (state.matrix) {
          state.matrix.forEach((row) => {
            row.forEach((item) => {
              item.inRange = false;
            });
          });
        }
      }
    },
    incrementValue(
      state,
      action: PayloadAction<{ i: number; j: number }>
    ) {
      const { i, j } = action.payload;
      if (state.matrix && state.matrix[i] && state.matrix[i][j]) {
        state.matrix[i][j].value++;
        state.sums[i]++;
        const rowSum = state.matrix[i].reduce(
          (acc, item) => acc + item.value,
          0
        );
        state.matrix[i].forEach((item) => {
          item.percentageInAmount = +(
            item.value /
            (rowSum / 100)
          ).toFixed(1);
        });
        state.averages = calcAverageValues(state.matrix);
      } else {
        console.log(`Значення для позиції (${i}, ${j}) не знайдено`);
      }
    },

    deleteRow(state, action: PayloadAction<{ rowIndex: number }>) {
      if (state.n) {
        state.n = state.n - 1;
      }
      if (
        state.matrix &&
        action.payload.rowIndex >= 0 &&
        action.payload.rowIndex < state.matrix.length
      ) {
        state.matrix &&
          state.matrix.splice(action.payload.rowIndex, 1);
        state.sums.splice(action.payload.rowIndex, 1);
        state.averages = calcAverageValues(state.matrix);
      } else {
        console.log("Неправильний індекс для видалення.");
      }
    },
    addRow(state): void {
      if (state.n) {
        state.n = state.n + 1;
      }

      if (state.n !== null && state.n > 0) {
        const newRow: matrixItem[] = [];
        const rowIndex = state.matrix?.length ?? 0;
        let rowSum = 0;

        for (let i = 0; i < state.n; i++) {
          const randomValue =
            Math.round(Math.random() * (200 - 100 + 1)) + 100;
          rowSum += randomValue;
          newRow.push({
            value: randomValue,
            id: `${rowIndex},${i}`,
            percentageInAmount: 0,
            inRange: false,
          });
        }

        if (state.matrix) {
          state.matrix.push(newRow);

          newRow.forEach((item) => {
            item.percentageInAmount = +(
              item.value /
              (rowSum / 100)
            ).toFixed(1);
          });

          state.sums = calcSumString(state.matrix);
          state.averages = calcAverageValues(state.matrix);
        }
      }
    },
    changeSizeValue(
      state,
      action: PayloadAction<{ n: number; m: number }>
    ) {
      state.m = action.payload.m;
      state.n = action.payload.n;

      state.matrix = initialMatrix(state.n, state.m ?? 0);
      state.sums = calcSumString(state.matrix);
      state.averages = calcAverageValues(state.matrix);
    },
  },
});

export const selectMatrix = (state: RootState) =>
  state.matrixSlice.matrix;

export const {
  checkRange,
  incrementValue,
  deleteRow,
  addRow,
  changeSizeValue,
} = matrixSlice.actions;

export default matrixSlice.reducer;
