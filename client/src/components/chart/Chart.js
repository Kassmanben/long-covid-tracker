import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  LineChart,
  Label,
  Line,
  CartesianGrid,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import CustomTooltip from "./CustomTooltip";
import CustomXAxis from "./CustomXAxis";

export const Chart = (items) => {
  console.log(items);
  return (
    <ResponsiveContainer width="95%" height={500}>
      <LineChart margin={{ top: 60, bottom: 30 }} data={items}>
        <Line type="monotone" dataKey="rank" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <CustomXAxis dataKey="date" chartTitle="Daily Rank" xAxisTitle="Date" />
        <YAxis>
          <Label angle={-90} value="Rank" offset={20} position="insideLeft" />
        </YAxis>
        <Tooltip content={<CustomTooltip />} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
