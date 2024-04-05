import React, { useState } from "react";
import "./App.scss";
import { useAppDispatch, useAppSelector } from "./utils/hooks";
import { AveragesItem, SumItem } from "./components";
import {
  addRow,
  changeSizeValue,
  deleteRow,
} from "./redux/slice/matrix";

import MatrixItem from "./components/matrixItem";
import { connect } from "react-redux";
import { RootState } from "./redux";

const App: React.FC<any> = React.memo(
  ({ n, m }) => {
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

    const renderMatrix = () => {
      console.log("render");
      const matrix: Array<React.ReactElement> = [];
      for (let i = 0; i < n; i++) {
        const row: Array<React.ReactElement> = [];
        for (let j = 0; j < m; j++) {
          row.push(<MatrixItem key={`${i}-${j}`} i={i} j={j} />);
        }
        row.push(
          <>
            <SumItem i={i} />
            <span
              onClick={() => handelDeleteRow(i)}
              className='delete-row'
            >
              ❌
            </span>
          </>
        );
        matrix.push(
          <div className='matrix-row' key={i}>
            {row}
          </div>
        );
      }

      const averagesRow: Array<React.ReactElement> = [];
      for (let i = 0; i < m; i++) {
        averagesRow.push(<AveragesItem i={i} key={i} />);
      }
      averagesRow.push(
        <li onClick={() => handelAddRow()} className='add-row'>
          ➕
        </li>
      );
      matrix.push(<ul className='average-column'>{averagesRow}</ul>);
      return matrix;
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
          {n && m ? (
            <>
              <ul className='matrix-ro----'>{renderMatrix()}</ul>
            </>
          ) : (
            <div>Ведіть параметри</div>
          )}
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.n === nextProps.n && prevProps.m === nextProps.m;
  }
);

const mapStateToProps = (state: RootState) => ({
  n: state.matrixSlice.n,
  m: state.matrixSlice.m,
});

export default connect(mapStateToProps)(App);
