import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";

import axios from "axios";

import Utils from "../Utilities";
import Chart from "./chart/Chart";
let API_URL = Utils.API_URL;

function Home() {
  const [rank, setRank] = useState(-1);
  const [note, setNote] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`${API_URL}/getdata`)
      const mappedData = result.data.map((dataItem) => {
        return ({
          ...dataItem,
          id: dataItem._id,
          date: new Date(dataItem.date).toLocaleDateString()
        });
      })
      setItems(mappedData);
    };

    fetchData();
  }, []);

  // onSubmit = (e) => {
  //   e.preventDefault();
  //   var dataToPost = {
  //     ...(this.state.rank > -1 && { rank: this.state.rank }),
  //     ...(this.state.note !== "" && { note: this.state.note }),
  //   };

  //   fetch(`${API_URL}/newdata`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //     method: "POST",
  //     body: JSON.stringify(dataToPost),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       this.addItem(data);
  //     });
  // };

  return (
    <Container>
      {/* <Form onSubmit={this.onSubmit} inline="true">
          <Form.Group controlId="rankSelect">
            <Form.Label>Rank how you are feeling today from 0-10</Form.Label>
            <Form.Control
              value={this.state.rank === -1 ? 0 : this.state.rank}
              as="select"
              onChange={(e) => {
                this.setState({ rank: e.target.value });
              }}
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </Form.Control>
            <FormControl
              value={this.state.note}
              onChange={(e) => {
                this.setState({ note: e.target.value });
              }}
              type="text"
              placeholder="Note (optional)"
              className="mr-sm-2 input-large search-query"
            />
            <Button
              variant="outline-success"
              type="submit"
              disabled={this.state.rank === -1}
            >
              Submit
            </Button>
          </Form.Group>
        </Form> */}
      <Chart items={items} />
    </Container>
  );
}

export default Home;
