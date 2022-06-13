import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Container} from "react-bootstrap";

import Chart from "./chart/Chart";
import RankForm from "./forms/RankForm";
import ActivityForm from "./forms/ActivityForm";

function Home() {
    const [rankChartItems, setRankChartItems] = useState([]);
    const [activityChartItems, setActivityChartItems] = useState([]);

    return (
        <Container>
            <RankForm setRankChartItems={setRankChartItems} rankChartItems={rankChartItems}/>
            <Chart items={rankChartItems} dataKey="rank" chartTitle="Daily Rank" yAxisLabel="Rank"/>
            <ActivityForm setActivityChartItems={setActivityChartItems} activityChartItems={activityChartItems}/>
            <Chart items={activityChartItems} dataKey="timeAllotted" chartTitle="Time Allotted for Activities"
                   yAxisLabel="Time Allotted (min)"/>

        </Container>
    );
}

export default Home;
