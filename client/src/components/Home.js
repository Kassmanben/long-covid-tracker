import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, FormControl, Button, Container } from "react-bootstrap";
import {
  LineChart,
  Label,
  Line,
  CartesianGrid,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import Utils from "../Utilities";
import Chart from "./chart/Chart";
import CustomXAxis from "./chart/CustomXAxis";
import CustomTooltip from "./chart/CustomTooltip";
let API_URL = Utils.API_URL;

class Home extends React.Component {
  constructor() {
    super();
    this.state = { rank: -1, note: "", items: [] };
  }

  componentDidMount() {
    fetch(`${API_URL}/getdata`)
      .then((res) => res.json())
      .then((dataItems) => {
        dataItems.forEach((item) => {
          this.addItem(item);
        });
      });
  }

  onSubmit = (e) => {
    e.preventDefault();
    var dataToPost = {
      ...(this.state.rank > -1 && { rank: this.state.rank }),
      ...(this.state.note !== "" && { note: this.state.note }),
    };

    fetch(`${API_URL}/newdata`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "POST",
      body: JSON.stringify(dataToPost),
    })
      .then((res) => res.json())
      .then((data) => {
        this.addItem(data);
      });
  };

  addItem = (data) => {
    var date = new Date(data.date);

    var chartData = {
      rank: data.rank,
      note: data.note,
      date: date.toLocaleDateString("en-US"),
    };

    this.setState({
      items: [...this.state.items, chartData],
    });
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.onSubmit} inline="true">
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
        </Form>
        <ResponsiveContainer width="95%" height={500}>
          <LineChart margin={{ top: 60, bottom: 30 }} data={this.state.items}>
            <Line type="monotone" dataKey="rank" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <CustomXAxis
              dataKey="date"
              chartTitle="Daily Rank"
              xAxisTitle="Date"
            />
            <YAxis>
              <Label
                angle={-90}
                value="Rank"
                offset={20}
                position="insideLeft"
              />
            </YAxis>
            <Tooltip content={<CustomTooltip />} />
          </LineChart>
        </ResponsiveContainer>
        <Chart items={this.state.items} />
      </Container>
    );
  }
}

export default Home;
