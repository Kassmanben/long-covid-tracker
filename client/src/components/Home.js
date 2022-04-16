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
    this.state = { text: "", cards: [] }

  }

  componentDidMount() {
    fetch(`${API_URL}/getposts`)
      .then(res => res.json())
      .then(posts => {
        posts.forEach(post => this.addCard(post))
      })
  }

  onSubmit = e => {
    e.preventDefault()
    fetch(`${API_URL}/newpost`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({ text: this.state.text })
    })
      .then(res => res.json())
      .then(post => {
        this.addCard(post)
      })
  }

  addCard = post => {
    let card =
      <Card className="mt-2" key={post.timestamp}>
        <Card.Body>
          <Card.Title>{post.text}</Card.Title>
          <Card.Subtitle>
            {(new Date(post.timestamp)).toString()}
          </Card.Subtitle>
        </Card.Body>
      </Card>

    this.setState({ cards: [...this.state.cards, card] })
    console.log(this.state.cards)
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
        {this.state.cards}
      </Container>
    )
  }
}

export default Home;
