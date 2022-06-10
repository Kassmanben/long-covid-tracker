import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  LineChart,
  Label,
  Line,
  CartesianGrid,
  YAxis,
  Tooltip,
  ResponsiveContainer, XAxis,
} from "recharts";
import CustomTooltip from "./CustomTooltip";


function Chart(props) {
  const { items } = props;
  const xAxisProps = {
    dataKey: "date",
    chartTitle: "Daily Rank",
    xAxisTitle: "Date",
  };
  console.log(xAxisProps);

  return (
      <ResponsiveContainer width="95%" height={500}>
        <LineChart margin={{top: 60, bottom: 30}} data={items}>
          <Line type="monotone" dataKey="rank" stroke="#8884d8"/>
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
          <XAxis dataKey="date">
            <Label
                value="Daily Rank"
                offset={400}
                position="top"
                style={{fontSize: "200%", fontWeight: "bold"}}
            />

            <Label value="Date" offset={-20} position="insideBottom"/>
          </XAxis>
          <YAxis>
            <Label angle={-90} value="Rank" offset={20} position="insideLeft"/>
          </YAxis>
          <Tooltip content={<CustomTooltip/>}/>
        </LineChart>
      </ResponsiveContainer>
  );
}

export default Chart;
