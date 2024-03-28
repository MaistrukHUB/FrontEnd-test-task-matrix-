import React, {  useState } from "react";
import "./App.scss";
import { useAppDispatch, useAppSelector } from "./utils/hooks";
import { AveragesItem, SumItem } from "./components";
import {
  addRow,
  changeSizeValue,
  deleteRow,
} from "./redux/slice/matrix";
import {
  matrixItem,
  matrixRow,
} from "./components/@types/matrix/matrix";
import MatrixItem from "./components/matrixItem";
import { connect } from "react-redux";
import { RootState } from "./redux";

const App: React.FC<any> = React.memo(
  ({ matrix, averages }) => {
    const dispatch = useAppDispatch();

    const [valueRow, setValueRow] = useState<number | null>(null);
    const [valueColumn, setValueColumn] = useState<number | null>(
      null
    );

    const handelInputRow = (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const changeValue = +e.target.value;
      setValueRow(changeValue);
    };

    const handelInputColumn = (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const changeValue = +e.target.value;
      setValueColumn(changeValue);
    };

    const handelSaveInputValues = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      e.preventDefault();
      if (valueRow && valueColumn) {
        dispatch(changeSizeValue({ n: valueRow, m: valueColumn }));
        setValueRow(null);
        setValueColumn(null);
      }
    };

  

    const handelDeleteRow = (rowIndex: number) => {
      dispatch(deleteRow({ rowIndex }));
    };
    const handelAddRow = () => {
      dispatch(addRow());
    };

    return (
      <div className='App'>
        <div className='inputs-value-matrix'>
          <input
            value={`${valueRow}`}
            onChange={(e) => handelInputRow(e)}
            placeholder='Введіть кількість стрічок'
            type='number'
          />
          <input
            value={`${valueColumn}`}
            onChange={(e) => handelInputColumn(e)}
            placeholder='Введіть кількість стовпців'
            type='number'
          />
          <button
            onClick={(e) => handelSaveInputValues(e)}
            className='save-input-values'
          >
            Зберегти параметри
          </button>
        </div>
        <div className='matrix'>
          {matrix ? (
            <>
              {" "}
              <ul className='matrix-ro----'>
                {matrix &&
                  matrix.map((row: matrixItem[], i: number) => (
                    <div className='matrix-row' key={i}>
                      {row.map((item: matrixItem, j: number) => (
                        <MatrixItem key={`${i}-${j}`} i={i} j={j} />
                      ))}
                      <SumItem i={i} />
                      <span
                        onClick={() => handelDeleteRow(i)}
                        className='delete-row'
                      >
                        ❌
                      </span>
                    </div>
                  ))}
                {/* {n && m && renderMatrix(n, m)} */}
                {/* {matrix &&
                matrix.map((row, i) => (
                  <li className='matrix-row-item'>
                    <MatrixRow row={row} key={i} rowI={i} />
                    <SumItem item={sums[i]} itemI={i} />
                    <span
                      onClick={() => handelDeleteRow(i)}
                      className='delete-row'
                    >
                      ❌
                    </span>
                  </li>
                ))} */}
              </ul>
              <ul className='average-column'>
                {averages &&
                  averages.map((item: number, i: number) => (
                    <AveragesItem item={item} />
                  ))}
                <li
                  onClick={() => handelAddRow()}
                  className='add-row'
                >
                  ➕
                </li>
              </ul>
            </>
          ) : (
            <div>Ведіть параметри</div>
          )}
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.matrix === nextProps.matrix;
  }
);

const mapStateToProps = (state: RootState) => ({
  n: state.matrixSlice.n,
  m: state.matrixSlice.m,
  matrix: state.matrixSlice.matrix,
  averages: state.matrixSlice.averages,
});

export default connect(mapStateToProps)(App);
