import React from "react";
import styles from "./averagesItem.module.scss";
import { IAveragesItem } from "../@types/averagesItem";
import { connect } from "react-redux";
import { RootState } from "../../redux";

const AveragesItem: React.FC<IAveragesItem> = React.memo(
  ({ item }) => {
    return <div className={styles.root}>{item}</div>;
  }
);

const mapStateToProps = () => {
  return (state: RootState, ownProps: IAveragesItem) => {
    const item =
      state.matrixSlice.averages &&
      state.matrixSlice.averages[ownProps.i];

    return {
      i: ownProps.i,
      item,
    };
  };
};

export default connect(mapStateToProps)(AveragesItem);
