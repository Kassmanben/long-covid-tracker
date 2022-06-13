import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {CartesianGrid, Label, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis,} from "recharts";
import CustomTooltip from "./CustomTooltip";


function Chart(props) {
    const {items, dataKey, chartTitle, yAxisLabel} = props;

    return (
        <ResponsiveContainer width="95%" height={500}>
            <LineChart margin={{top: 60, bottom: 30, left: 20}} data={items}>
                <Line type="monotone" dataKey={dataKey} stroke="#8884d8"/>
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
                <XAxis dataKey="date">
                    <Label
                        value={chartTitle}
                        offset={400}
                        position="top"
                        style={{fontSize: "200%", fontWeight: "bold"}}
                    />

                    <Label value="Date" offset={-20} position="insideBottom"/>
                </XAxis>
                <YAxis>
                    <Label angle={-90} value={yAxisLabel} offset={0} position="insideLeft"/>
                </YAxis>
                <Tooltip content={<CustomTooltip/>}/>
            </LineChart>
        </ResponsiveContainer>
    );
}

export default Chart;
