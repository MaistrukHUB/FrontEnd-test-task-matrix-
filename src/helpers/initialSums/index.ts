import { matrix } from "../../components/@types/matrix/matrix";

export function calcSumString(matrix: matrix): number[] {
    const sums = [];
    for (let i = 0; i < matrix.length; i++) {
        let sum = 0;
        for (let j = 0; j < matrix[i].length; j++) {
            sum += matrix[i][j].value;
        }
        sums.push(sum);
    }
    return sums;
}
