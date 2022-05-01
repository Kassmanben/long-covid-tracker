import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, FormControl, Button, Card, Container } from "react-bootstrap";

import Utils from "../Utilities";
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
        dataItems.forEach((item) => this.addItem(item));
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
    let item = (
      <Card className="mt-2" key={data.date}>
        <Card.Body>
          <Card.Title>{new Date(data.rank).toString()}</Card.Title>
          <Card.Subtitle>{data.rank}</Card.Subtitle>
          {data.note && <Card.Subtitle>{data.note}</Card.Subtitle>}
        </Card.Body>
      </Card>
    );

    this.setState({ items: [...this.state.items, item] });
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
        {this.state.items}
      </Container>
    );
  }
}

export default Home;
