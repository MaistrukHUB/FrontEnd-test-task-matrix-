import { matrixItem } from "../matrix/matrix";

export interface IMatrixItem {
  i: number;
  j: number;
  indexRow?: number | null;
  visionPercent?: boolean | null;
  itemValue?: number | null;
  percentValue?: number | null;
  inRange?: boolean | null;
}
