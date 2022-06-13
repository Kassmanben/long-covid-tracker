import React, {useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Button, Container, Form, FormControl} from "react-bootstrap";

import axios from "axios";

import Chart from "./chart/Chart";
import {mapActivityData, mapRankData} from "../utils/utils";
import {axiosConfig, GET_ACTIVITY_URL, GET_RANK_URL, POST_ACTIVITY_URL, POST_RANK_URL} from "../config/apiConfig";

function Home() {
    const [rank, setRank] = useState(-1);
    const [note, setNote] = useState("");
    const [rankChartItems, setRankChartItems] = useState([]);

    const [name, setName] = useState("");
    const [timeAllotted, setTimeAllotted] = useState(0);
    const [activityChartItems, setActivityChartItems] = useState([]);

    useEffect(() => {
        const fetchRanks = async () => {
            await axios.get(GET_RANK_URL).then((res) => {
                setRankChartItems(mapRankData(res.data));
            }).catch((err) => {
                console.log("Error getting data: ", err);
            })
        };

        fetchRanks().catch((err) => {
            console.log("Error getting data: ", err);
        })

        const fetchActivities = async () => {
            await axios.get(GET_ACTIVITY_URL).then((res) => {
                setActivityChartItems(mapActivityData(res.data));
            }).catch((err) => {
                console.log("Error getting data: ", err);
            })
        };

        fetchActivities().catch((err) => {
            console.log("Error getting data: ", err);
        })
    }, []);

    const onRankFormSubmit = (e) => {
        e.preventDefault();
        const postData = {
            ...(rank > -1 && {rank}),
            ...(note !== "" && {note}),
        };

        axios.post(POST_RANK_URL, postData, axiosConfig)
            .then((res) => {
                setRankChartItems(mapRankData([...rankChartItems, res.data]));
            }).catch((err) => {
            console.log("Error posting data: ", err);
        })
    };

    const onActivityFormSubmit = (e) => {
        e.preventDefault();
        const postData = {
            ...(name !== "" && {name}),
            ...(timeAllotted > 0 && {timeAllotted}),
        };

        axios.post(POST_ACTIVITY_URL, postData, axiosConfig)
            .then((res) => {
                setActivityChartItems(mapActivityData([...activityChartItems, res.data]));
            }).catch((err) => {
            console.log("Error posting data: ", err);
        })
    };


    const rankedOptions = [...Array(11).keys()].map(i => <option key={i} value={i}>{i}</option>);

    return (
        <Container>
            <Form onSubmit={onRankFormSubmit} inline="true">
                <Form.Group controlId="rankSelect">
                    <Form.Label>Rank how you are feeling today from 0-10</Form.Label>
                    <Form.Control
                        value={rank === -1 ? 0 : rank}
                        as="select"
                        onChange={(e) => {
                            setRank(e.target.value)
                        }}
                    >
                        {rankedOptions}
                    </Form.Control>
                    <FormControl
                        value={note}
                        onChange={(e) => {
                            setNote(e.target.value)
                        }}
                        type="text"
                        placeholder="Note (optional)"
                        className="mr-sm-2 input-large search-query"
                    />
                    <Button
                        variant="outline-success"
                        type="submit"
                        disabled={rank === -1}
                    >
                        Submit
                    </Button>
                </Form.Group>
            </Form>

            <Chart items={rankChartItems} dataKey="rank" chartTitle="Daily Rank" yAxisLabel="Rank"/>
            <Form onSubmit={onActivityFormSubmit} inline="true">
                <Form.Group controlId="activitySelect">
                    <Form.Label>Add Activity</Form.Label>
                    <FormControl
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value)
                        }}
                        type="text"
                        placeholder="Activity Name"
                        className="mr-sm-2 input-large search-query"
                    />
                    <Form.Control
                        value={timeAllotted < 0 ? 0 : timeAllotted}
                        type="number"
                        onChange={(e) => {
                            if (e.target.value !== "") {
                                setTimeAllotted(e.target.value)
                            } else setTimeAllotted(0)
                        }}
                    />
                    <Button
                        variant="outline-success"
                        type="submit"
                        disabled={timeAllotted === 0 && name === ""}
                    >
                        Add
                    </Button>
                </Form.Group>
            </Form>
            <Chart items={activityChartItems} dataKey="timeAllotted" chartTitle="Time Allotted for Activities"
                   yAxisLabel="Time Allotted (min)"/>

        </Container>
    );
}

export default Home;
