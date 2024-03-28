import React from "react";
import styles from "./averagesItem.module.scss";
import { IAveragesItem } from "../@types/averagesItem";

const AveragesItem: React.FC<IAveragesItem> = React.memo(
  ({ item }) => {
    console.log('Averages',item)
    return <div className={styles.root}>{item}</div>;
  }
);

export default AveragesItem;
