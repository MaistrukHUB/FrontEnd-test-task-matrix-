import React, { useEffect, useState } from "react";
import styles from "./SumItem.module.scss";
import { ISumItem } from "../@types/sumItem";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { setInvisible, setVisible } from "../../redux/slice/sumsRows";

const SumItem: React.FC<ISumItem> = React.memo(({ i }) => {
  const dispatch = useAppDispatch();

  const showItem = () => {
    dispatch(setInvisible());

  };

  const sumValue = useAppSelector(
    (state) => state.matrixSlice.sums[i]
  );
  console.log('sum',sumValue);

  const showPercent = () => {
    dispatch(setVisible({ indexRow: i, sumValue }));
  };

  return (
    <li
      onMouseEnter={showPercent}
      onMouseLeave={showItem}
      className={styles.root}
    >
      {sumValue}
    </li>
  );
});

export default SumItem;
