import {
  matrix,
  matrixItem,
} from "../../components/@types/matrix/matrix";

export function calcAverageValues(matrix: matrix): number[] {
  if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
    return [];
  }

  const averages: number[] = [];
  const columnCount = matrix[0].length;

  for (let j = 0; j < columnCount; j++) {
    let sum = 0;
    for (let i = 0; i < matrix.length; i++) {
      const item: matrixItem = matrix[i][j];
      if (item && typeof item.value === "number") {
        sum += item.value;
      }
    }
    const average = sum / matrix.length;
    const roundedAverage = Math.round(average);
    averages.push(roundedAverage);
  }

  return averages;
}
