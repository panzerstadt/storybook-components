import React from "react";
import { FixedSizeGrid as Grid } from "react-window";

import styles from "./ReactWindow.module.css";

const Cell = ({ columnIndex, rowIndex, style }) => (
  <div
    className={
      columnIndex % 2
        ? rowIndex % 2 === 0
          ? styles.gridItemOdd
          : styles.gridItemEven
        : rowIndex % 2
        ? styles.gridItemOdd
        : styles.gridItemEven
    }
    style={style}
  >
    r{rowIndex}, c{columnIndex}
  </div>
);

const HeaderRowCell = ({ columnIndex, rowIndex, style }) => (
  <div
    className={
      columnIndex % 2
        ? rowIndex % 2 === 0
          ? styles.gridRowHeaderEven
          : styles.gridRowHeaderOdd
        : rowIndex % 2
        ? styles.gridRowHeaderEven
        : styles.gridRowHeaderOdd
    }
    style={style}
  >
    r{rowIndex}, c{columnIndex}
  </div>
);

const HeaderColCell = ({ columnIndex, rowIndex, style }) => (
  <div
    className={
      columnIndex % 2
        ? rowIndex % 2 === 0
          ? styles.gridColHeaderEven
          : styles.gridColHeaderOdd
        : rowIndex % 2
        ? styles.gridColHeaderEven
        : styles.gridColHeaderOdd
    }
    style={style}
  >
    r{rowIndex}, c{columnIndex}
  </div>
);

const Example = ({
  data,
  colCount = 1000,
  rowCount = 1000,
  height = 400,
  width = 600,
  cellHeight = 35,
  cellWidth = 150
}) => {
  const staticColumn = React.useRef(null);
  const staticRow = React.useRef(null);
  const onScroll = React.useCallback(
    ({ scrollTop, scrollLeft, scrollUpdateWasRequested }) => {
      if (!scrollUpdateWasRequested) {
        staticColumn.current.scrollTo({ scrollLeft: 0, scrollTop });
        staticRow.current.scrollTo({ scrollLeft, scrollTop: 0 });
      }
    }
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column"
      }}
    >
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ width: cellWidth }}>
          {" "}
          {/* this is the hidden white box on the top left */}{" "}
        </div>
        <Grid
          ref={staticRow}
          style={{ overflowX: "hidden" }}
          className={styles.gridRowHeader}
          columnCount={colCount}
          columnWidth={cellWidth}
          height={cellHeight}
          rowCount={1}
          rowHeight={cellHeight}
          width={width}
        >
          {HeaderRowCell}
        </Grid>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row"
        }}
      >
        <Grid
          ref={staticColumn}
          style={{ overflowY: "hidden" }}
          className={styles.gridColHeader}
          columnCount={1}
          columnWidth={cellWidth}
          height={height}
          rowCount={rowCount}
          rowHeight={cellHeight}
          width={cellWidth}
        >
          {HeaderColCell}
        </Grid>

        <Grid
          onScroll={onScroll}
          className={styles.grid}
          columnCount={colCount}
          columnWidth={cellWidth}
          height={height}
          rowCount={rowCount}
          rowHeight={cellHeight}
          width={width}
        >
          {Cell}
        </Grid>
      </div>
    </div>
  );
};

export default Example;
