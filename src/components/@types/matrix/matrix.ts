export type matrixItem = { value: number; id: string ;percentageInAmount:number;inRange: boolean};
export type matrixRow = matrixItem[];
export type matrix = matrixRow[];

export interface IMatrixInitialState {
  n: number | null;
  m: number | null;
  matrix: matrix | null;
  averages: number[];
  sums: number[];
}
