import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : ${payload[0].value}`}</p>
        <p className="desc">{payload[0].payload.note}</p>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
