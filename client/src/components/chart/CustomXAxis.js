import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Label, XAxis } from "recharts";

export const CustomXAxis = (dataKey, chartTitle, xAxisTitle) => {
  console.log(dataKey);
  return (
    <XAxis dataKey={dataKey}>
      <Label
        value={chartTitle}
        offset={400}
        position="top"
        style={{ fontSize: "200%", fontWeight: "bold" }}
      />

      <Label value={xAxisTitle} offset={-20} position="insideBottom" />
    </XAxis>
  );
};

export default CustomXAxis;
