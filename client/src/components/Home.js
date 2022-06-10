import React, {useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Button, Container, Form, FormControl} from "react-bootstrap";

import axios from "axios";

import Chart from "./chart/Chart";
import {dbDataToChartItem} from "../utils/dataUtils";
import {axiosConfig, GET_DATA, POST_DATA} from "../config/apiConfig";

function Home() {
    const [rank, setRank] = useState(-1);
    const [note, setNote] = useState("");
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await axios.get(GET_DATA).then((res) => {
                setItems(res.data.map((dataItem) => {
                    return dbDataToChartItem(dataItem)
                }));
            }).catch((err) => {
                console.log("AXIOS ERROR: ", err);
            })
        };

        fetchData();
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        var postData = {
            ...(rank > -1 && {rank}),
            ...(note !== "" && {note}),
        };

        axios.post(POST_DATA, postData, axiosConfig)
            .then((res) => {
                setItems([...items, dbDataToChartItem(res.data)]);
            }).catch((err) => {
            console.log("AXIOS ERROR: ", err);
        })
    };

    const rankedOptions = [...Array(11).keys()].map(i => <option key={i} value={i}>{i}</option>);

    return (
        <Container>
            <Form onSubmit={onSubmit} inline="true">
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
            <Chart items={items}/>
        </Container>
    );
}

export default Home;
