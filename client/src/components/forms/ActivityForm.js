import React, {useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Button, Form, FormControl} from "react-bootstrap";
import axios from "axios";
import {axiosConfig, GET_ACTIVITY_URL, POST_ACTIVITY_URL} from "../../config/apiConfig";
import {mapActivityData} from "../../utils/utils";

function RankForm(props) {
    const {activityChartItems, setActivityChartItems} = props

    const [name, setName] = useState("");
    const [timeAllotted, setTimeAllotted] = useState(0);
    useEffect(() => {
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
    }, [setActivityChartItems]);


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

    return (
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
    );
}

export default RankForm;
