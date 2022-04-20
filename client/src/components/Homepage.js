import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Form,
  FormControl,
  Button,
  Card,
  Container
} from 'react-bootstrap'

import Utils from '../Utilities';
let API_URL = Utils.API_URL

class Home extends React.Component {

  constructor() {
    super()
    this.state = { text: "", items: [] }

  }

  componentDidMount() {
    fetch(`${API_URL}/getdata`)
      .then(res => res.json())
      .then(dataItems => {
        dataItems.forEach(item => this.addItem(item))
      })
  }

  onSubmit = e => {
    e.preventDefault()
    fetch(`${API_URL}/newdata`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({ text: this.state.text })
    })
      .then(res => res.json())
      .then(data => {
        this.addItem(data)
      })
  }

  addItem = data => {
    let item =
      <Card className="mt-2" key={data.date}>
        <Card.Body>
          <Card.Title>{data.text}</Card.Title>
          <Card.Subtitle>
            {(new Date(data.date)).toString()}
          </Card.Subtitle>
        </Card.Body>
      </Card>

    this.setState({ items: [...this.state.items, item] })
    console.log(this.state.items)
  }

  render() {
    return (
      <Container>
        <Form onSubmit={this.onSubmit} inline="true">
          <FormControl value={this.state.text}
            onChange={e => this.setState({ text: e.target.value })}
            type="text" placeholder="Search" className="mr-sm-2 input-large search-query" />
          <Button variant="outline-success" type="submit">Submit</Button>
        </Form>
        {this.state.items}
      </Container>
    )
  }
}

export default Home;
