import {  matrix } from "../../components/@types/matrix/matrix";

interface MatrixItem {
  value: number;
  id: string;
  percentageInAmount: number;
}

export function initialMatrix(n: number, m: number): matrix {
  const matrix: matrix = [];

  for (let i = 0; i < n; i++) {
    matrix[i] = [];

    const rowValues: number[] = [];
    let rowSum = 0;

    for (let j = 0; j < m; j++) {
      const randomValue = Math.round(Math.random() * (200 - 100 + 1)) + 100;
      rowValues.push(randomValue);
      rowSum += randomValue;
    }

    for (let j = 0; j < m; j++) {
      const percentageInAmount = (rowValues[j] / (rowSum / 100)).toFixed(1);

      matrix[i][j] = {
        value: rowValues[j],
        id: `${i},${j}`,
        percentageInAmount: parseFloat(percentageInAmount),
        inRange:false
      };
    }
  }

  return matrix;
}

