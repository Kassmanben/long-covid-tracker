import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Container} from "react-bootstrap";

import Chart from "./chart/Chart";
import RankForm from "./forms/RankForm";
import ActivityForm from "./forms/ActivityForm";

function Home() {
    const [rankChartItems, setRankChartItems] = useState([]);
    const [activityChartItems, setActivityChartItems] = useState([]);

    const activityDataKeys = []

    activityChartItems.forEach(item => {
        Object.keys(item).forEach(k => {
            if (k !== "date" && !activityDataKeys.includes(k)) {
                activityDataKeys.push(k)
            }
        })
    })

    return (
        <Container>
            <RankForm setRankChartItems={setRankChartItems} rankChartItems={rankChartItems}/>
            <Chart items={rankChartItems} dataKeys={["rank"]} chartTitle="Daily Rank" yAxisLabel="Rank"/>
            <ActivityForm setActivityChartItems={setActivityChartItems} activityChartItems={activityChartItems}/>
            <Chart items={activityChartItems} dataKeys={activityDataKeys} chartTitle="Time Allotted for Activities"
                   yAxisLabel="Time Allotted (min)"/>

        </Container>
    );
}

export default Home;
