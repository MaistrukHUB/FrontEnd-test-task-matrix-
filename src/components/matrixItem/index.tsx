import React, { useCallback, useEffect, useState } from "react";
import styles from "./MatrixItem.module.scss";
import { IMatrixItem } from "../@types/matrixItem";
import { useAppDispatch } from "../../utils/hooks";
import { checkRange, incrementValue } from "../../redux/slice/matrix";
import classNames from "classnames";
import { connect } from "react-redux";
import { RootState } from "../../redux";

const MatrixItem: React.FC<IMatrixItem> = React.memo(
  ({
    i,
    j,
    indexRow,
    visionPercent,
    itemValue,
    percentValue,
    inRange,
  }) => {
    const dispatch = useAppDispatch();

    const incrementValueItem = useCallback(
      (i: number, j: number) => {
        dispatch(incrementValue({ i, j }));
      },
      [dispatch]
    );
    console.log(itemValue);

    const mouseEnter = () => {
      dispatch(checkRange({ rangeValue: itemValue ? itemValue : 0 }));
    };
    const mouseLeave = () => {
      dispatch(checkRange({ rangeValue: 0 }));
    };

    return (
      <div
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
        onClick={() => incrementValueItem(i, j)}
        style={
          visionPercent && i === indexRow
            ? {
                backgroundImage: `linear-gradient(to top, yellow ${percentValue}%,
                transparent ${percentValue}%, transparent 100%)`,
              }
            : {}
        }
        className={classNames(styles.root, {
          [styles.visible]: visionPercent && i === indexRow,
          [styles.similar]: inRange === true,
        })}
      >
        {visionPercent && i === indexRow
          ? `${percentValue} %`
          : itemValue}
      </div>
    );
  },
  (prevProps, nextProps) => {
    const shouldUpdate =
      (prevProps.i !== nextProps.i && prevProps.j !== nextProps.j) ||
      prevProps.itemValue !== nextProps.itemValue ||
      (prevProps.visionPercent !== nextProps.visionPercent &&
        nextProps.indexRow === nextProps.i) ||
      prevProps.inRange !== nextProps.inRange;
    return !shouldUpdate;
  }
);

const mapStateToProps = () => {
  let prevItemValue: any = null;

  return (state: RootState, ownProps: IMatrixItem) => {
    const inRange =
      state.matrixSlice.matrix &&
      state.matrixSlice.matrix[ownProps.i][ownProps.j].inRange;
    const itemValue =
      state.matrixSlice.matrix &&
      state.matrixSlice.matrix[ownProps.i][ownProps.j].value;
    const percentValue =
      state.matrixSlice.matrix &&
      state.matrixSlice.matrix[ownProps.i][ownProps.j]
        .percentageInAmount;
    const indexRow = state.sumsRowsSlice.indexRow;
    const visionPercent = state.sumsRowsSlice.visionPercent;

    const shouldUpdate =
      itemValue !== prevItemValue && visionPercent === true;
    if (shouldUpdate) {
      prevItemValue = itemValue;
    }

    return {
      itemValue,
      percentValue,
      indexRow,
      visionPercent,
      shouldUpdate,
      inRange,
    };
  };
};

export default connect(mapStateToProps)(MatrixItem);
