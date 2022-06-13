import React, {useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Button, Form, FormControl} from "react-bootstrap";
import axios from "axios";
import {axiosConfig, GET_RANK_URL, POST_RANK_URL} from "../../config/apiConfig";
import {mapRankData} from "../../utils/utils";

function RankForm(props) {
    const {rankChartItems, setRankChartItems} = props
    const [rank, setRank] = useState(-1);
    const [note, setNote] = useState("");

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
    }, [setRankChartItems]);

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

    const rankedOptions = [...Array(11).keys()].map(i => <option key={i} value={i}>{i}</option>);

    return (
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
    );
}

export default RankForm;
